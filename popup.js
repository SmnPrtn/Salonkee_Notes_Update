// SALON TEMPLATES ADMIN PANEL
console.log('🏥 Admin Panel gestartet');

let currentTemplates = {};
let currentSettings = {};
let fieldCounter = 0;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  setupTabs();
});

// DATEN LADEN
async function loadData() {
  try {
    const result = await chrome.storage.local.get(['customTemplates', 'settings']);
    currentTemplates = result.customTemplates || {};
    currentSettings = {
      autoPreview: true,
      autoCopy: false,
      dateFormat: 'de-DE',
      ...result.settings
    };
    
    updateUI();
    console.log('✅ Daten geladen:', currentTemplates);
  } catch (error) {
    console.error('❌ Fehler beim Laden:', error);
    showToast('Fehler beim Laden der Daten', 'error');
  }
}

// UI AKTUALISIEREN
function updateUI() {
  renderTemplatesList();
  updateSettingsUI();
}

// TEMPLATES LISTE RENDERN
function renderTemplatesList() {
  const container = document.getElementById('templates-list');
  
  if (Object.keys(currentTemplates).length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #666;">
        <p>📝 Noch keine benutzerdefinierten Templates vorhanden.</p>
        <p>Verwende den "Erstellen" Tab, um dein erstes Template anzulegen.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = Object.entries(currentTemplates).map(([key, template]) => `
    <div class="template-item" data-key="${key}">
      <div class="template-info">
        <span class="template-icon">${template.icon || '📝'}</span>
        <div>
          <div class="template-name">${template.name}</div>
          <div class="template-fields">${template.fields.length} Felder</div>
        </div>
      </div>
      <div class="template-actions">
        <button class="btn btn-outline" onclick="editTemplate('${key}')">✏️</button>
        <button class="btn btn-outline" onclick="duplicateTemplate('${key}')">📋</button>
        <button class="btn btn-danger" onclick="deleteTemplate('${key}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

// SETTINGS UI AKTUALISIEREN
function updateSettingsUI() {
  document.getElementById('auto-preview').checked = currentSettings.autoPreview;
  document.getElementById('auto-copy').checked = currentSettings.autoCopy;
  document.getElementById('date-format').value = currentSettings.dateFormat;
}

// EVENT LISTENERS
function setupEventListeners() {
  // Template erstellen
  document.getElementById('add-field-btn').onclick = addField;
  document.getElementById('save-template-btn').onclick = saveTemplate;
  document.getElementById('clear-form-btn').onclick = clearForm;
  
  // Import/Export
  document.getElementById('export-btn').onclick = exportTemplates;
  document.getElementById('import-btn').onclick = () => document.getElementById('import-file').click();
  document.getElementById('import-file').onchange = importTemplates;
  
  // Settings
  document.getElementById('auto-preview').onchange = saveSettings;
  document.getElementById('auto-copy').onchange = saveSettings;
  document.getElementById('date-format').onchange = saveSettings;
  
  // Danger Zone
  document.getElementById('reset-templates-btn').onclick = resetTemplates;
  document.getElementById('clear-all-btn').onclick = clearAllTemplates;
  
  // Live Preview
  document.getElementById('template-name').oninput = updatePreview;
  document.getElementById('template-icon').oninput = updatePreview;
  document.getElementById('template-key').oninput = updatePreview;
}

// TABS SETUP
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => switchTab(btn.dataset.tab);
  });
}

function switchTab(tabName) {
  // Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  // Content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`);
  });
}

// FELD HINZUFÜGEN
function addField() {
  fieldCounter++;
  const container = document.getElementById('fields-container');
  
  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'field-item';
  fieldDiv.dataset.fieldId = fieldCounter;
  
  fieldDiv.innerHTML = `
    <div class="field-header">
      <span class="field-title">Feld ${fieldCounter}</span>
      <button class="remove-field" onclick="removeField(${fieldCounter})">×</button>
    </div>
    
    <div class="field-row">
      <input type="text" placeholder="Feldname" class="field-name" oninput="updatePreview()">
      <select class="field-type" onchange="toggleFieldOptions(${fieldCounter}); updatePreview();">
        <option value="text">Text</option>
        <option value="number">Nummer</option>
        <option value="textarea">Textfeld</option>
        <option value="select">Auswahl</option>
      </select>
    </div>
    
    <input type="text" placeholder="Platzhalter-Text" class="field-placeholder" oninput="updatePreview()">
    
    <div class="field-options" id="options-${fieldCounter}">
      <label>Auswahloptionen (eine pro Zeile):</label>
      <textarea class="field-options-text" placeholder="Option 1&#10;Option 2&#10;Option 3" oninput="updatePreview()"></textarea>
    </div>
  `;
  
  container.appendChild(fieldDiv);
  updatePreview();
}

// FELD ENTFERNEN
function removeField(fieldId) {
  const field = document.querySelector(`[data-field-id="${fieldId}"]`);
  if (field) {
    field.remove();
    updatePreview();
  }
}

// FELD-OPTIONEN TOGGLE
function toggleFieldOptions(fieldId) {
  const select = document.querySelector(`[data-field-id="${fieldId}"] .field-type`);
  const options = document.getElementById(`options-${fieldId}`);
  
  if (select.value === 'select') {
    options.classList.add('show');
  } else {
    options.classList.remove('show');
  }
}

// PREVIEW AKTUALISIEREN
function updatePreview() {
  const name = document.getElementById('template-name').value || 'Neues Template';
  const icon = document.getElementById('template-icon').value || '📝';
  const fields = collectFields();
  
  const today = new Date().toLocaleDateString('de-DE');
  let preview = `${icon} ${name} - ${today}\n${'='.repeat(40)}\n\n`;
  
  if (fields.length > 0) {
    fields.forEach(field => {
      preview += `${field.name}: [${field.type}]\n`;
    });
  } else {
    preview += '(Keine Felder definiert)\n';
  }
  
  document.getElementById('template-preview').textContent = preview;
}

// FELDER SAMMELN
function collectFields() {
  const fields = [];
  document.querySelectorAll('.field-item').forEach(fieldDiv => {
    const name = fieldDiv.querySelector('.field-name').value.trim();
    if (!name) return;
    
    const type = fieldDiv.querySelector('.field-type').value;
    const placeholder = fieldDiv.querySelector('.field-placeholder').value.trim();
    
    const field = { name, type, placeholder };
    
    if (type === 'select') {
      const optionsText = fieldDiv.querySelector('.field-options-text').value.trim();
      field.options = optionsText.split('\n').filter(opt => opt.trim()).map(opt => opt.trim());
    }
    
    fields.push(field);
  });
  
  return fields;
}

// TEMPLATE SPEICHERN
async function saveTemplate() {
  const name = document.getElementById('template-name').value.trim();
  const icon = document.getElementById('template-icon').value.trim();
  const key = document.getElementById('template-key').value.trim();
  const fields = collectFields();
  
  // Validierung
  if (!name) {
    showToast('Bitte Template-Name eingeben', 'warning');
    return;
  }
  
  if (!key) {
    showToast('Bitte Template-Schlüssel eingeben', 'warning');
    return;
  }
  
  if (fields.length === 0) {
    showToast('Bitte mindestens ein Feld hinzufügen', 'warning');
    return;
  }
  
  // Schlüssel-Validierung
  if (!/^[a-z0-9-_]+$/.test(key)) {
    showToast('Schlüssel darf nur Kleinbuchstaben, Zahlen, - und _ enthalten', 'warning');
    return;
  }
  
  // Template erstellen
  const template = {
    name,
    icon: icon || '📝',
    fields
  };
  
  try {
    currentTemplates[key] = template;
    await chrome.storage.local.set({ customTemplates: currentTemplates });
    
    showToast(`Template "${name}" gespeichert!`, 'success');
    clearForm();
    updateUI();
    switchTab('templates');
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    showToast('Fehler beim Speichern', 'error');
  }
}

// FORMULAR LEEREN
function clearForm() {
  document.getElementById('template-name').value = '';
  document.getElementById('template-icon').value = '';
  document.getElementById('template-key').value = '';
  document.getElementById('fields-container').innerHTML = '';
  document.getElementById('template-preview').textContent = 'Vorschau erscheint hier...';
  fieldCounter = 0;
}

// TEMPLATE BEARBEITEN
function editTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  switchTab('create');
  
  document.getElementById('template-name').value = template.name;
  document.getElementById('template-icon').value = template.icon || '';
  document.getElementById('template-key').value = key;
  
  // Felder laden
  document.getElementById('fields-container').innerHTML = '';
  fieldCounter = 0;
  
  template.fields.forEach(field => {
    addField();
    const fieldDiv = document.querySelector(`[data-field-id="${fieldCounter}"]`);
    
    fieldDiv.querySelector('.field-name').value = field.name;
    fieldDiv.querySelector('.field-type').value = field.type;
    fieldDiv.querySelector('.field-placeholder').value = field.placeholder || '';
    
    if (field.type === 'select' && field.options) {
      toggleFieldOptions(fieldCounter);
      fieldDiv.querySelector('.field-options-text').value = field.options.join('\n');
    }
  });
  
  updatePreview();
}

// TEMPLATE DUPLIZIEREN
function duplicateTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  editTemplate(key);
  document.getElementById('template-name').value = template.name + ' (Kopie)';
  document.getElementById('template-key').value = key + '-copy';
  updatePreview();
}

// TEMPLATE LÖSCHEN
async function deleteTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  if (!confirm(`Template "${template.name}" wirklich löschen?`)) return;
  
  try {
    delete currentTemplates[key];
    await chrome.storage.local.set({ customTemplates: currentTemplates });
    
    showToast(`Template "${template.name}" gelöscht`, 'success');
    updateUI();
  } catch (error) {
    console.error('Fehler beim Löschen:', error);
    showToast('Fehler beim Löschen', 'error');
  }
}

// SETTINGS SPEICHERN
async function saveSettings() {
  currentSettings = {
    autoPreview: document.getElementById('auto-preview').checked,
    autoCopy: document.getElementById('auto-copy').checked,
    dateFormat: document.getElementById('date-format').value
  };
  
  try {
    await chrome.storage.local.set({ settings: currentSettings });
    showToast('Einstellungen gespeichert', 'success');
  } catch (error) {
    console.error('Fehler beim Speichern der Einstellungen:', error);
    showToast('Fehler beim Speichern', 'error');
  }
}

// TEMPLATES EXPORTIEREN
function exportTemplates() {
  const data = {
    templates: currentTemplates,
    settings: currentSettings,
    exportDate: new Date().toISOString(),
    version: '2.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `salon-templates-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
  showToast('Templates exportiert!', 'success');
}

// TEMPLATES IMPORTIEREN
async function importTemplates(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!data.templates) {
      showToast('Ungültiges Template-Format', 'error');
      return;
    }
    
    const importCount = Object.keys(data.templates).length;
    
    if (!confirm(`${importCount} Templates importieren? Vorhandene Templates mit gleichen Schlüsseln werden überschrieben.`)) {
      return;
    }
    
    currentTemplates = { ...currentTemplates, ...data.templates };
    if (data.settings) {
      currentSettings = { ...currentSettings, ...data.settings };
    }
    
    await chrome.storage.local.set({ 
      customTemplates: currentTemplates,
      settings: currentSettings 
    });
    
    updateUI();
    showToast(`${importCount} Templates importiert!`, 'success');
  } catch (error) {
    console.error('Import-Fehler:', error);
    showToast('Fehler beim Importieren', 'error');
  }
  
  // Input zurücksetzen
  event.target.value = '';
}

// TEMPLATES ZURÜCKSETZEN
async function resetTemplates() {
  if (!confirm('Alle benutzerdefinierten Templates löschen und auf Standard zurücksetzen?')) return;
  
  try {
    currentTemplates = {};
    await chrome.storage.local.set({ customTemplates: {} });
    
    updateUI();
    clearForm();
    showToast('Templates zurückgesetzt', 'success');
  } catch (error) {
    console.error('Fehler beim Zurücksetzen:', error);
    showToast('Fehler beim Zurücksetzen', 'error');
  }
}

// ALLE TEMPLATES LÖSCHEN
async function clearAllTemplates() {
  if (!confirm('WIRKLICH ALLE Templates und Einstellungen löschen? Diese Aktion kann nicht rückgängig gemacht werden!')) return;
  
  try {
    await chrome.storage.local.clear();
    currentTemplates = {};
    currentSettings = {};
    
    updateUI();
    clearForm();
    showToast('Alle Daten gelöscht', 'success');
  } catch (error) {
    console.error('Fehler beim Löschen:', error);
    showToast('Fehler beim Löschen', 'error');
  }
}

// TOAST NOTIFICATION
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  // Animation
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Template-Name zu Schlüssel konvertieren
document.getElementById('template-name').addEventListener('input', (e) => {
  const keyField = document.getElementById('template-key');
  if (!keyField.value) {
    const key = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    keyField.value = key;
  }
});

console.log('✅ Admin Panel bereit');