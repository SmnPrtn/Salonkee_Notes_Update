// SALON TEMPLATES ADMIN PANEL - ENHANCED VERSION
console.log('🏥 Enhanced Admin Panel gestartet');

let currentTemplates = {};
let defaultTemplates = {};
let currentSettings = {};
let fieldCounter = 0;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  setupTabs();
});

// STANDARD TEMPLATES LADEN (wie in content.js)
function getDefaultTemplates() {
  return {
    'laser': {
      name: 'Laser-Haarentfernung',
      icon: '⚡',
      category: 'Behandlung',
      type: 'zones',
      zones: [
        'Achsel', 'Oberlippe/Kinn', 'Bikinizone', 'Intimzone Komplett',
        'Beine komplett', 'Unterschenkel', 'Oberschenkel', 'Arme komplett',
        'Unterarme', 'Oberarme', 'Rücken', 'Brust', 'Bauch', 'Gesicht komplett'
      ]
    },
    'hautanalyse': {
      name: 'Hautanalyse',
      icon: '🔍',
      category: 'Analyse',
      type: 'fields',
      fields: [
        { name: 'Hauttyp', type: 'select', options: ['Normal', 'Trocken', 'Ölig', 'Mischhaut', 'Empfindlich', 'Reif'] },
        { name: 'Hautzustand aktuell', type: 'select', options: ['Gut', 'Gestresst', 'Dehydriert', 'Gereizt', 'Normal'] },
        { name: 'Problemzonen', type: 'text', placeholder: 'z.B. T-Zone, Wangen, Kinn, Stirn' },
        { name: 'Unreinheiten', type: 'select', options: ['Keine', 'Mitesser', 'Pickel', 'Unterlagerungen', 'Akne', 'Mischart'] },
        { name: 'Pigmentierung', type: 'select', options: ['Keine', 'Altersflecken', 'Aknenarben', 'Melasma', 'Sonstige'] },
        { name: 'Hautalterung', type: 'select', options: ['Keine', 'Feine Linien', 'Tiefe Falten', 'Elastizitätsverlust'] },
        { name: 'Poren', type: 'select', options: ['Fein', 'Normal', 'Vergrößert', 'Verstopft'] },
        { name: 'Rötungen/Couperose', type: 'text', placeholder: 'Beschreibung falls vorhanden' },
        { name: 'Bisherige Pflegeroutine', type: 'textarea', placeholder: 'Aktuelle Routine morgens/abends' },
        { name: 'Aktuell verwendete Produkte', type: 'textarea', placeholder: 'Marken und Produktnamen' },
        { name: 'Allergien/Unverträglichkeiten', type: 'text', placeholder: 'Bekannte Allergien oder Unverträglichkeiten' },
        { name: 'Medikamente (hautrelevant)', type: 'text', placeholder: 'Isotretinoin, Blutverdünner, etc.' },
        { name: 'UV-Schutz', type: 'select', options: ['Täglich', 'Gelegentlich', 'Nie'] },
        { name: 'Behandlungshistorie', type: 'textarea', placeholder: 'Frühere Gesichtsbehandlungen, Peelings, etc.' },
        { name: 'Hauptprobleme/Wünsche', type: 'textarea', placeholder: 'Was soll verbessert werden?' },
        { name: 'Heimpflege-Empfehlung', type: 'textarea', placeholder: 'Empfohlene Routine und Produkte' },
        { name: 'Behandlungsvorschlag', type: 'textarea', placeholder: 'Vorgeschlagene Behandlung und Lösung' },
        { name: 'Einverständniserklärung & Gesundheitsfragen geklärt', type: 'select', options: ['Ja', 'Nein'], required: true },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'bodyanalyse': {
      name: 'Bodyanalyse',
      icon: '💪',
      category: 'Analyse',
      type: 'fields',
      fields: [
        { name: 'Behandlungsbereich(e)', type: 'text', placeholder: 'z.B. Bauch, Oberschenkel, Oberarme, Po' },
        { name: 'Hauptproblemzone', type: 'text', placeholder: 'Welche Zone ist am problematischsten?' },
        { name: 'Behandlungsziel', type: 'textarea', placeholder: 'Cellulite-Reduktion, Straffung, Konturierung, etc.' },
        { name: 'Cellulite-Grad', type: 'select', options: ['Keiner sichtbar', 'Grad 1 (nur beim Kneifen)', 'Grad 2 (im Stehen sichtbar)', 'Grad 3 (auch im Liegen sichtbar)', 'Grad 4 (sehr ausgeprägt)'] },
        { name: 'Hautbeschaffenheit', type: 'select', options: ['Straff', 'Normal', 'Schlaff', 'Sehr schlaff'] },
        { name: 'Hautelastizität', type: 'select', options: ['Gut', 'Mäßig', 'Schlecht'] },
        { name: 'Umfänge Vorher', type: 'textarea', placeholder: 'z.B. Bauch: 85cm, Oberschenkel rechts: 58cm, links: 59cm' },
        { name: 'Vorbehandlungen', type: 'textarea', placeholder: 'Andere Körperbehandlungen, OPs, Fettabsaugung, etc.' },
        { name: 'Sport/Bewegung', type: 'text', placeholder: 'Häufigkeit und Art der sportlichen Aktivität' },
        { name: 'Wasserkonsum', type: 'select', options: ['Unter 1L täglich', '1-2L täglich', 'Über 2L täglich'] },
        { name: 'Medikamente/Blutverdünner', type: 'text', placeholder: 'Falls ja, welche?' },
        { name: 'Behandlungsplan', type: 'textarea', placeholder: 'Empfohlene Anzahl Sitzungen, Intervalle' },
        { name: 'Intensität Start', type: 'select', options: ['Niedrig', 'Mittel', 'Hoch'] },
        { name: 'Empfohlene Nachsorge', type: 'textarea', placeholder: 'Lymphdrainage, Sport, Ernährung, etc.' },
        { name: 'Vorher-Bilder gemacht', type: 'select', options: ['Ja', 'Nein'], required: true },
        { name: 'Einverständniserklärung & Gesundheitsfragen geklärt', type: 'select', options: ['Ja', 'Nein'], required: true },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'hydrafacial': {
      name: 'HydraFacial',
      icon: '💧',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Signature', 'Deluxe', 'Premium', 'Lymphdrainage Single'] },
        { name: 'Verwendete Booster/Seren', type: 'text', placeholder: 'z.B. Vitamin C, Hyaluronsäure' },
        { name: 'Heimpflege-Empfehlung', type: 'textarea', placeholder: 'Empfohlene Produkte und Routine' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'microneedling': {
      name: 'Microneedling',
      icon: '📍',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Classic', 'Purifying nach QMS', 'meets HydraFacial', 'meets Forma'] },
        { name: 'Nadeltiefe', type: 'text', placeholder: 'z.B. 1.5mm, 2.0mm' },
        { name: 'Verwendete Wirkstoffe', type: 'textarea', placeholder: 'Seren, Wirkstoffe während der Behandlung' },
        { name: 'Hautreaktion', type: 'text', placeholder: 'Rötung, Schwellung, etc.' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'facial-is': {
      name: 'IS Clinical Facial',
      icon: '✨',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Fire & Ice', 'Foaming Enzyme', 'Honey Enzyme'] },
        { name: 'Hauttyp', type: 'select', options: ['Normal', 'Trocken', 'Ölig', 'Mischhaut', 'Empfindlich'] },
        { name: 'Verwendete Produkte', type: 'text', placeholder: 'Spezielle Seren oder Add-ons' },
        { name: 'Hautreaktion', type: 'text', placeholder: 'Sofortige Reaktion der Haut' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'permanent-makeup': {
      name: 'Permanent Makeup',
      icon: '💄',
      category: 'Spezial',
      type: 'fields',
      fields: [
        { name: 'Behandlungsbereich', type: 'select', options: ['Augenbrauen Pudertechnik', 'Lippen', 'Eyeliner'] },
        { name: 'Art der Behandlung', type: 'select', options: ['Neuanlage', 'Nacharbeit', 'Auffrischen'] },
        { name: 'Farbwahl', type: 'text', placeholder: 'Verwendete Farbpigmente' },
        { name: 'Verträglichkeit', type: 'select', options: ['Sehr gut', 'Gut', 'Empfindlich'] },
        { name: 'Heilungsverlauf', type: 'text', placeholder: 'Nur bei Nachbehandlung' },
        { name: 'Stichtiefe', type: 'text', placeholder: 'z.B. 1.2mm' },
        { name: 'Hub', type: 'text', placeholder: 'z.B. 2.5mm' },
        { name: 'Nadel-Art', type: 'text', placeholder: 'z.B. 3er Liner' },
        { name: 'Verwendetes Gerät', type: 'text', placeholder: 'Gerätename' }
      ]
    },
    'lymphdrainage': {
      name: 'Lymphdrainage',
      icon: '🌊',
      category: 'Körper',
      type: 'fields',
      fields: [
        { name: 'Programm/Intensität', type: 'text', placeholder: 'z.B. Programm 3, mittlere Intensität' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'qms-facial': {
      name: 'QMS Facial',
      icon: '👑',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Intense Collagen', 'Intense Purifying', 'Detoxing', 'Regeneration'] },
        { name: 'Hauttyp', type: 'select', options: ['Normal', 'Trocken', 'Ölig', 'Mischhaut', 'Reif'] },
        { name: 'Besondere Produkte', type: 'text', placeholder: 'Spezielle Masken oder Seren' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'forma': {
      name: 'Forma Thermolifting',
      icon: '🔥',
      category: 'Körper',
      type: 'zones',
      zones: [
        'Gesicht komplett', 'Stirn', 'Wangen', 'Kinn/Jawline', 'Hals', 'Dekolleté',
        'Bauch', 'Oberschenkel', 'Unterschenkel', 'Arme', 'Rücken', 'Brust'
      ],
      fields: [
        { name: 'Verträglichkeit', type: 'select', options: ['Sehr gut', 'Gut', 'Empfindlich'] },
        { name: 'Sofortige Reaktion', type: 'text', placeholder: 'Straffung, Rötung, Wärme' },
        { name: 'Vorher/Nachher-Bild gemacht?', type: 'select', options: ['Ja', 'Nein'], required: true },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Einverständniserklärung & Gesundheitsfragen geklärt', type: 'select', options: ['Ja', 'Nein'] },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'jetpeel': {
      name: 'JetPeel',
      icon: '💨',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['JetPeel Classic', 'JetPeel meets HydraFacial', 'Lymphdrainage Single'] },
        { name: 'Verwendete Seren', type: 'text', placeholder: 'z.B. Hyaluron, Vitamin C, etc.' },
        { name: 'Verträglichkeit', type: 'select', options: ['Sehr gut', 'Gut', 'Empfindlich'] },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'body-treatment': {
      name: 'Body FX / EvolveX',
      icon: '💪',
      category: 'Körper',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Body FX', 'EvolveX', 'Body FX meets EvolveX'] },
        { name: 'Behandlungsbereich', type: 'text', placeholder: 'Bauch, Oberschenkel, Arme, etc.' },
        { name: 'Programm/Intensität', type: 'text', placeholder: 'z.B. Level 7, 25 Min' },
        { name: 'Verträglichkeit', type: 'select', options: ['Sehr gut', 'Gut', 'Empfindlich'] },
        { name: 'Reaktion', type: 'text', placeholder: 'Wärme, Kribbeln, Rötung' },
        { name: 'Messungen/Fortschritt', type: 'textarea', placeholder: 'Umfänge, Fortschritte (optional)' },
        { name: 'Vorher/Nachher-Bild gemacht?', type: 'select', options: ['Ja', 'Nein'], required: true },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Einverständniserklärung & Gesundheitsfragen geklärt', type: 'select', options: ['Ja', 'Nein'] },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'chemical-peel': {
      name: 'Chemisches Peeling',
      icon: '🧪',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Peelingart', type: 'select', options: ['Prodigy Peel P2', 'Prodigy Peel P3'] },
        { name: 'Hauttyp', type: 'select', options: ['Normal', 'Ölig', 'Empfindlich', 'Reif'] },
        { name: 'Einwirkzeit', type: 'text', placeholder: 'z.B. 8 Minuten' },
        { name: 'Verträglichkeit', type: 'select', options: ['Sehr gut', 'Gut', 'Brennen', 'Stark brennend'] },
        { name: 'Sofortreaktion', type: 'text', placeholder: 'Rötung, Schälung, etc.' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Einverständniserklärung & Gesundheitsfragen geklärt', type: 'select', options: ['Ja', 'Nein'] },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'student-facial': {
      name: 'Study & Glow Facial',
      icon: '📚',
      category: 'Gesicht',
      type: 'fields',
      fields: [
        { name: 'Behandlungsart', type: 'select', options: ['Clear & Balance', 'Glow & Clean', 'HydraFacial Fresh Mini'] },
        { name: 'Hauttyp', type: 'select', options: ['Jung/Unrein', 'Normal', 'Trocken'] },
        { name: 'Hauptproblem', type: 'text', placeholder: 'Unreinheiten, Trockenheit, etc.' },
        { name: 'Verwendete Produkte', type: 'text', placeholder: 'Besondere Masken oder Seren' },
        { name: 'Hautreaktion', type: 'text', placeholder: 'Verbesserung, Glow-Effekt' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    }
  };
}

// DATEN LADEN
async function loadData() {
  try {
    const result = await chrome.storage.local.get(['customTemplates', 'defaultTemplates', 'settings']);
    
    defaultTemplates = getDefaultTemplates();
    currentTemplates = {
      ...defaultTemplates,
      ...(result.defaultTemplates || {}),
      ...(result.customTemplates || {})
    };
    
    currentSettings = {
      autoPreview: true,
      autoCopy: false,
      dateFormat: 'de-DE',
      ...result.settings
    };
    
    updateUI();
    console.log('✅ Daten geladen:', Object.keys(currentTemplates).length, 'Templates');
  } catch (error) {
    console.error('❌ Fehler beim Laden:', error);
    showToast('Fehler beim Laden der Daten', 'error');
  }
}

// UI AKTUALISIEREN
function updateUI() {
  renderTemplatesList();
  renderTemplatesOverview();
  updateSettingsUI();
}

// TEMPLATE ÜBERSICHT RENDERN
function renderTemplatesOverview() {
  const container = document.getElementById('templates-overview');
  if (!container) return;
  
  const totalTemplates = Object.keys(currentTemplates).length;
  const defaultCount = Object.keys(defaultTemplates).length;
  const customCount = totalTemplates - defaultCount;
  
  // Kategorien zählen
  const categories = {};
  Object.values(currentTemplates).forEach(template => {
    const cat = template.category || 'Andere';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  container.innerHTML = `
    <div class="template-overview">
      <div class="overview-card">
        <div class="overview-number">${totalTemplates}</div>
        <div class="overview-label">Templates Gesamt</div>
      </div>
      <div class="overview-card">
        <div class="overview-number">${defaultCount}</div>
        <div class="overview-label">Standard Templates</div>
      </div>
      <div class="overview-card">
        <div class="overview-number">${customCount}</div>
        <div class="overview-label">Eigene Templates</div>
      </div>
      <div class="overview-card">
        <div class="overview-number">${Object.keys(categories).length}</div>
        <div class="overview-label">Kategorien</div>
      </div>
    </div>
  `;
}

// TEMPLATES LISTE RENDERN
function renderTemplatesList() {
  const container = document.getElementById('templates-list');
  
  if (Object.keys(currentTemplates).length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px; color: #666;">
        <p style="font-size: 16px;">📝 Noch keine Templates vorhanden.</p>
        <p>Verwende den "Erstellen" Tab, um dein erstes Template anzulegen.</p>
      </div>
    `;
    return;
  }
  
  // Gruppierung nach Kategorien
  const grouped = {};
  Object.entries(currentTemplates).forEach(([key, template]) => {
    const category = template.category || 'Andere';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push([key, template]);
  });
  
  let html = '';
  Object.entries(grouped).forEach(([category, templates]) => {
    html += `
      <div style="margin-bottom: 32px;">
        <h4 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e1e4e8;">
          ${getCategoryIcon(category)} ${category} (${templates.length})
        </h4>
        <div class="templates-grid">
          ${templates.map(([key, template]) => `
            <div class="template-item" data-key="${key}">
              <div class="template-info">
                <span class="template-icon">${template.icon || '📝'}</span>
                <div>
                  <div class="template-name">${template.name}</div>
                  <div class="template-fields">
                    ${getTemplateFieldsInfo(template)} ${isDefaultTemplate(key) ? '• Standard' : '• Benutzerdefiniert'}
                  </div>
                </div>
              </div>
              <div class="template-actions">
                <button class="btn btn-outline" onclick="editTemplate('${key}')" title="Bearbeiten">✏️</button>
                <button class="btn btn-outline" onclick="duplicateTemplate('${key}')" title="Duplizieren">📋</button>
                ${!isDefaultTemplate(key) ? `<button class="btn btn-danger" onclick="deleteTemplate('${key}')" title="Löschen">🗑️</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// HILFSFUNKTIONEN
function getCategoryIcon(category) {
  const icons = {
    'Analyse': '🔍',
    'Gesicht': '💆‍♀️',
    'Körper': '💪',
    'Behandlung': '⚡',
    'Spezial': '✨',
    'Andere': '📝'
  };
  return icons[category] || '📝';
}

function getTemplateFieldsInfo(template) {
  if (template.fields) {
    return `${template.fields.length} Felder`;
  } else if (template.zones) {
    return `${template.zones.length} Zonen`;
  }
  return '0 Felder';
}

function isDefaultTemplate(key) {
  return defaultTemplates.hasOwnProperty(key);
}

// SETTINGS UI AKTUALISIEREN
function updateSettingsUI() {
  const autoPreview = document.getElementById('auto-preview');
  const autoCopy = document.getElementById('auto-copy');
  const dateFormat = document.getElementById('date-format');
  
  if (autoPreview) autoPreview.checked = currentSettings.autoPreview;
  if (autoCopy) autoCopy.checked = currentSettings.autoCopy;
  if (dateFormat) dateFormat.value = currentSettings.dateFormat;
}

// EVENT LISTENERS
function setupEventListeners() {
  // Template erstellen
  const addFieldBtn = document.getElementById('add-field-btn');
  const saveTemplateBtn = document.getElementById('save-template-btn');
  const clearFormBtn = document.getElementById('clear-form-btn');
  
  if (addFieldBtn) addFieldBtn.onclick = addField;
  if (saveTemplateBtn) saveTemplateBtn.onclick = saveTemplate;
  if (clearFormBtn) clearFormBtn.onclick = clearForm;
  
  // Import/Export
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');
  
  if (exportBtn) exportBtn.onclick = exportTemplates;
  if (importBtn) importBtn.onclick = () => importFile.click();
  if (importFile) importFile.onchange = importTemplates;
  
  // Settings
  const autoPreview = document.getElementById('auto-preview');
  const autoCopy = document.getElementById('auto-copy');
  const dateFormat = document.getElementById('date-format');
  
  if (autoPreview) autoPreview.onchange = saveSettings;
  if (autoCopy) autoCopy.onchange = saveSettings;
  if (dateFormat) dateFormat.onchange = saveSettings;
  
  // Danger Zone
  const resetTemplatesBtn = document.getElementById('reset-templates-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  
  if (resetTemplatesBtn) resetTemplatesBtn.onclick = resetTemplates;
  if (clearAllBtn) clearAllBtn.onclick = clearAllTemplates;
  
  // Live Preview
  const templateName = document.getElementById('template-name');
  const templateIcon = document.getElementById('template-icon');
  const templateKey = document.getElementById('template-key');
  
  if (templateName) templateName.oninput = updatePreview;
  if (templateIcon) templateIcon.oninput = updatePreview;
  if (templateKey) templateKey.oninput = updatePreview;
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
  
  // Templates-Übersicht aktualisieren wenn Templates Tab geöffnet wird
  if (tabName === 'templates') {
    renderTemplatesOverview();
  }
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
    
    <div style="margin-top: 12px;">
      <label style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
        <input type="checkbox" class="field-required" onchange="updatePreview()">
        Pflichtfeld
      </label>
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
  const name = document.getElementById('template-name')?.value || 'Neues Template';
  const icon = document.getElementById('template-icon')?.value || '📝';
  const fields = collectFields();
  
  const today = new Date().toLocaleDateString('de-DE');
  let preview = `${icon} ${name} - ${today}\n${'='.repeat(40)}\n\n`;
  
  if (fields.length > 0) {
    fields.forEach(field => {
      const required = field.required ? ' *' : '';
      preview += `${field.name}${required}: [${field.type}]\n`;
      if (field.placeholder) {
        preview += `  → ${field.placeholder}\n`;
      }
      if (field.options && field.options.length > 0) {
        preview += `  → Optionen: ${field.options.join(', ')}\n`;
      }
      preview += `\n`;
    });
  } else {
    preview += '(Keine Felder definiert)\n';
  }
  
  const previewElement = document.getElementById('template-preview');
  if (previewElement) {
    previewElement.textContent = preview;
  }
}

// FELDER SAMMELN
function collectFields() {
  const fields = [];
  document.querySelectorAll('.field-item').forEach(fieldDiv => {
    const name = fieldDiv.querySelector('.field-name')?.value.trim();
    if (!name) return;
    
    const type = fieldDiv.querySelector('.field-type')?.value;
    const placeholder = fieldDiv.querySelector('.field-placeholder')?.value.trim();
    const required = fieldDiv.querySelector('.field-required')?.checked || false;
    
    const field = { name, type, placeholder, required };
    
    if (type === 'select') {
      const optionsText = fieldDiv.querySelector('.field-options-text')?.value.trim();
      field.options = optionsText ? optionsText.split('\n').filter(opt => opt.trim()).map(opt => opt.trim()) : [];
    }
    
    fields.push(field);
  });
  
  return fields;
}

// TEMPLATE SPEICHERN
async function saveTemplate() {
  const name = document.getElementById('template-name')?.value.trim();
  const icon = document.getElementById('template-icon')?.value.trim();
  const key = document.getElementById('template-key')?.value.trim();
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
    category: 'Benutzerdefiniert',
    type: 'fields',
    fields
  };
  
  try {
    // Unterscheiden zwischen Standard- und Custom-Templates
    if (isDefaultTemplate(key)) {
      // Standard-Template überschreiben
      const defaultTemplatesStorage = { [key]: template };
      await chrome.storage.local.set({ defaultTemplates: defaultTemplatesStorage });
    } else {
      // Custom Template speichern
      const customTemplates = JSON.parse(JSON.stringify(currentTemplates));
      // Standard-Templates ausfiltern
      Object.keys(defaultTemplates).forEach(defaultKey => {
        delete customTemplates[defaultKey];
      });
      customTemplates[key] = template;
      await chrome.storage.local.set({ customTemplates });
    }
    
    currentTemplates[key] = template;
    
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
  const templateName = document.getElementById('template-name');
  const templateIcon = document.getElementById('template-icon');
  const templateKey = document.getElementById('template-key');
  const fieldsContainer = document.getElementById('fields-container');
  const templatePreview = document.getElementById('template-preview');
  
  if (templateName) templateName.value = '';
  if (templateIcon) templateIcon.value = '';
  if (templateKey) templateKey.value = '';
  if (fieldsContainer) fieldsContainer.innerHTML = '';
  if (templatePreview) templatePreview.textContent = 'Vorschau erscheint hier...';
  
  fieldCounter = 0;
}

// TEMPLATE BEARBEITEN
function editTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  switchTab('create');
  
  const templateName = document.getElementById('template-name');
  const templateIcon = document.getElementById('template-icon');
  const templateKeyField = document.getElementById('template-key');
  
  if (templateName) templateName.value = template.name;
  if (templateIcon) templateIcon.value = template.icon || '';
  if (templateKeyField) templateKeyField.value = key;
  
  // Felder laden
  const fieldsContainer = document.getElementById('fields-container');
  if (fieldsContainer) {
    fieldsContainer.innerHTML = '';
    fieldCounter = 0;
    
    if (template.fields) {
      template.fields.forEach(field => {
        addField();
        const fieldDiv = document.querySelector(`[data-field-id="${fieldCounter}"]`);
        
        const fieldName = fieldDiv.querySelector('.field-name');
        const fieldType = fieldDiv.querySelector('.field-type');
        const fieldPlaceholder = fieldDiv.querySelector('.field-placeholder');
        const fieldRequired = fieldDiv.querySelector('.field-required');
        
        if (fieldName) fieldName.value = field.name;
        if (fieldType) fieldType.value = field.type;
        if (fieldPlaceholder) fieldPlaceholder.value = field.placeholder || '';
        if (fieldRequired) fieldRequired.checked = field.required || false;
        
        if (field.type === 'select' && field.options) {
          toggleFieldOptions(fieldCounter);
          const optionsText = fieldDiv.querySelector('.field-options-text');
          if (optionsText) optionsText.value = field.options.join('\n');
        }
      });
    }
  }
  
  updatePreview();
}

// TEMPLATE DUPLIZIEREN
function duplicateTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  editTemplate(key);
  const templateName = document.getElementById('template-name');
  const templateKeyField = document.getElementById('template-key');
  
  if (templateName) templateName.value = template.name + ' (Kopie)';
  if (templateKeyField) templateKeyField.value = key + '-copy';
  
  updatePreview();
}

// TEMPLATE LÖSCHEN
async function deleteTemplate(key) {
  const template = currentTemplates[key];
  if (!template) return;
  
  if (!confirm(`Template "${template.name}" wirklich löschen?`)) return;
  
  try {
    // Nur Custom Templates können gelöscht werden
    if (!isDefaultTemplate(key)) {
      const customTemplates = JSON.parse(JSON.stringify(currentTemplates));
      // Standard-Templates ausfiltern
      Object.keys(defaultTemplates).forEach(defaultKey => {
        delete customTemplates[defaultKey];
      });
      delete customTemplates[key];
      await chrome.storage.local.set({ customTemplates });
    }
    
    delete currentTemplates[key];
    
    showToast(`Template "${template.name}" gelöscht`, 'success');
    updateUI();
  } catch (error) {
    console.error('Fehler beim Löschen:', error);
    showToast('Fehler beim Löschen', 'error');
  }
}

// SETTINGS SPEICHERN
async function saveSettings() {
  const autoPreview = document.getElementById('auto-preview');
  const autoCopy = document.getElementById('auto-copy');
  const dateFormat = document.getElementById('date-format');
  
  currentSettings = {
    autoPreview: autoPreview?.checked || false,
    autoCopy: autoCopy?.checked || false,
    dateFormat: dateFormat?.value || 'de-DE'
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
    currentTemplates = { ...defaultTemplates };
    await chrome.storage.local.set({ 
      customTemplates: {},
      defaultTemplates: {}
    });
    
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
  if (!container) return;
  
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
document.addEventListener('DOMContentLoaded', () => {
  const templateName = document.getElementById('template-name');
  const templateKey = document.getElementById('template-key');
  
  if (templateName && templateKey) {
    templateName.addEventListener('input', (e) => {
      if (!templateKey.value) {
        const key = e.target.value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        templateKey.value = key;
      }
    });
  }
});

console.log('✅ Enhanced Admin Panel bereit');
