// SALON TEMPLATES - COMPLETE VERSION WITH ALL TREATMENTS
console.log('🏥 Salon Templates Complete - gestartet');

let isModalOpen = false;
let currentTemplates = {};

// STORAGE LADEN
chrome.storage.local.get(['customTemplates', 'settings'], (result) => {
  currentTemplates = {
    ...getDefaultTemplates(),
    ...(result.customTemplates || {})
  };
  
  // Button nach DOM-Load hinzufügen
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
});

// ALLE STANDARD TEMPLATES
function getDefaultTemplates() {
  return {
    'laser': {
      name: 'Laser-Haarentfernung',
      icon: '⚡',
      zones: [
        'Achsel', 
        'Oberlippe/Kinn', 
        'Bikinizone', 
        'Intimzone Komplett',
        'Beine komplett',
        'Unterschenkel', 
        'Oberschenkel',
        'Arme komplett',
        'Unterarme',
        'Oberarme', 
        'Rücken',
        'Brust',
        'Bauch',
        'Gesicht komplett'
      ]
    },
    'hydrafacial': {
      name: 'HydraFacial',
      icon: '💧',
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
      fields: [
        { name: 'Programm/Intensität', type: 'text', placeholder: 'z.B. Programm 3, mittlere Intensität' },
        { name: 'Individuelle Anmerkung', type: 'text', placeholder: 'Weitere Anmerkungen' },
        { name: 'Behandelnde Mitarbeiterin', type: 'select', options: ['Alina', 'Elena', 'Kathrin', 'Pia'], required: true }
      ]
    },
    'qms-facial': {
      name: 'QMS Facial',
      icon: '👑',
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
      zones: [
        'Gesicht komplett',
        'Stirn', 
        'Wangen',
        'Kinn/Jawline',
        'Hals',
        'Dekolleté',
        'Bauch',
        'Oberschenkel', 
        'Unterschenkel',
        'Arme',
        'Rücken',
        'Brust'
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

// BUTTON INJECTION
function injectButton() {
  if (document.getElementById('salon-templates-btn') || isModalOpen) return;
  
  // Verschiedene Selektoren versuchen
  const textarea = document.querySelector('#note_area') || 
                   document.querySelector('textarea[name*="note"]') ||
                   document.querySelector('textarea[placeholder*="notiz"]') ||
                   document.querySelector('textarea[placeholder*="Notiz"]') ||
                   document.querySelector('textarea') ||
                   document.querySelector('input[type="text"][name*="note"]');
                   
  if (!textarea) {
    console.log('🔍 Kein Notizfeld gefunden. Versuche es in 2 Sekunden nochmal...');
    setTimeout(injectButton, 2000);
    return;
  }
  
  console.log('✅ Notizfeld gefunden:', textarea);
  
  const button = document.createElement('button');
  button.id = 'salon-templates-btn';
  button.type = 'button';
  button.innerHTML = '📝 Behandlungsnotizen';
  
  button.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 16px;
    margin: 8px 4px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
  `;
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-1px)';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  });
  
  button.addEventListener('click', openModal);
  textarea.parentNode.insertBefore(button, textarea.nextSibling);
  console.log('✅ Template-Button hinzugefügt');
}

// MODAL ÖFFNEN
function openModal() {
  if (isModalOpen) return;
  isModalOpen = true;
  
  const backdrop = document.createElement('div');
  backdrop.id = 'salon-templates-backdrop';
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    position: relative;
  `;
  
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-size: 18px;">🏥 Behandlungsnotizen</h3>
      <button id="close-modal" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 16px;">✕</button>
    </div>
    
    <div style="padding: 20px; max-height: 60vh; overflow-y: auto;">
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Behandlung auswählen:</label>
        <select id="template-select" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
          <option value="">-- Vorlage wählen --</option>
          ${Object.entries(currentTemplates).map(([key, template]) => 
            `<option value="${key}">${template.icon} ${template.name}</option>`
          ).join('')}
        </select>
      </div>
      
      <div id="custom-date-section" style="display: none; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333; font-size: 14px;">📅 Individuelles Datum (optional):</label>
        <input type="date" id="custom-date" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        <small style="color: #666; font-size: 12px; margin-top: 5px; display: block;">Leer lassen für heutiges Datum</small>
      </div>
      
      <div id="template-content"></div>
      
      <div id="preview-section" style="display: none; background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #666; font-size: 14px;">📄 Vorschau:</h4>
        <pre id="preview-text" style="background: white; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; white-space: pre-wrap; max-height: 150px; overflow-y: auto;"></pre>
      </div>
    </div>
    
    <div style="padding: 20px; border-top: 1px solid #e9ecef; display: flex; gap: 12px;" id="modal-buttons">
      <button id="copy-btn" style="flex: 1; background: #28a745; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-size: 14px; display: none;" disabled>📋 Kopieren</button>
      <button id="insert-btn" style="flex: 1; background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-size: 14px; display: none;" disabled>➕ Einfügen</button>
      <button id="reset-btn" style="background: #6c757d; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; display: none;">🔄 Neu</button>
    </div>
  `;
  
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  setupModalEvents();
}

// MODAL EVENTS
function setupModalEvents() {
  const backdrop = document.getElementById('salon-templates-backdrop');
  const templateSelect = document.getElementById('template-select');
  const closeBtn = document.getElementById('close-modal');
  const copyBtn = document.getElementById('copy-btn');
  const insertBtn = document.getElementById('insert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const customDate = document.getElementById('custom-date');
  
  closeBtn.onclick = closeModal;
  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };
  
  templateSelect.onchange = loadTemplateContent;
  copyBtn.onclick = copyToClipboard;
  insertBtn.onclick = insertIntoTextarea;
  resetBtn.onclick = resetForm;
  customDate.onchange = updatePreview;
  
  document.addEventListener('keydown', handleKeydown);
}

// TEMPLATE CONTENT LADEN
function loadTemplateContent() {
  const select = document.getElementById('template-select');
  const container = document.getElementById('template-content');
  const copyBtn = document.getElementById('copy-btn');
  const insertBtn = document.getElementById('insert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const customDateSection = document.getElementById('custom-date-section');
  
  if (!select.value) {
    container.innerHTML = '';
    copyBtn.style.display = 'none';
    insertBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    customDateSection.style.display = 'none';
    document.getElementById('preview-section').style.display = 'none';
    return;
  }
  
  // CUSTOM DATE SECTION ANZEIGEN
  customDateSection.style.display = 'block';
  
  const template = currentTemplates[select.value];
  
  if (select.value === 'laser') {
    // LASER SPEZIELL - ALLE ZONEN OFFEN
    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Zusatzinfo:</label>
        <input type="text" id="zusatzinfo" placeholder="z.B. 'Kurbehandlung 4/4'" 
               style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 15px 0; color: #667eea; font-size: 16px; display: flex; align-items: center;">
          🎯 Behandelte Zonen
        </h4>
        <div id="zones-container">
          ${template.zones.map(zone => `
            <div class="zone-item" style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 12px; padding: 15px;">
              <h5 style="margin: 0 0 12px 0; color: #333; font-size: 14px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 8px;">${zone}:</h5>
              <input type="number" placeholder="Joule-Wert" class="joule-input" data-zone="${zone}"
                     style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; box-sizing: border-box;">
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Individuelle Anmerkung:</label>
        <input type="text" id="laser-individuelle-anmerkung" placeholder="Weitere Anmerkungen" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Kostenpunkt (Pflichtfeld!): <span style="color: red;">*</span></label>
        <input type="text" id="laser-kostenpunkt" placeholder="z.B. 120 €" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Einverständniserklärung & Gesundheitsfragen geklärt:</label>
        <select id="laser-einverstaendnis" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
          <option value="">-- Auswählen --</option>
          <option value="Ja">Ja</option>
          <option value="Nein">Nein</option>
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Behandelnde Mitarbeiterin (Pflichtfeld!): <span style="color: red;">*</span></label>
        <select id="laser-mitarbeiterin" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
          <option value="">-- Auswählen --</option>
          <option value="Alina">Alina</option>
          <option value="Elena">Elena</option>
          <option value="Kathrin">Kathrin</option>
          <option value="Pia">Pia</option>
        </select>
      </div>
    `;
    
  } else {
    // ANDERE TEMPLATES (Standard-Felder)
    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Zusatzinfo:</label>
        <input type="text" id="zusatzinfo" placeholder="z.B. 'Kur 3/6', 'Nachbehandlung', etc." 
               style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>
    ` + template.fields.map((field, index) => {
      const requiredLabel = field.required ? ' <span style="color: red;">*</span>' : '';
      const requiredAttr = field.required ? ' required' : '';
      
      if (field.type === 'select') {
        return `
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <select data-field="${index}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"${requiredAttr}>
              <option value="">-- Auswählen --</option>
              ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>
        `;
      } else if (field.type === 'textarea') {
        return `
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <textarea data-field="${index}" placeholder="${field.placeholder}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; min-height: 60px; resize: vertical; box-sizing: border-box;"${requiredAttr}></textarea>
          </div>
        `;
      } else {
        return `
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <input type="${field.type}" data-field="${index}" placeholder="${field.placeholder}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;"${requiredAttr}>
          </div>
        `;
      }
    }).join('');
  }
  
  // LIVE PREVIEW EVENT LISTENERS
  container.querySelectorAll('input, select, textarea').forEach(element => {
    element.oninput = updatePreview;
    element.onchange = updatePreview;
  });
  
  // BUTTONS ANZEIGEN
  copyBtn.style.display = 'block';
  insertBtn.style.display = 'block';
  resetBtn.style.display = 'block';
  copyBtn.disabled = false;
  insertBtn.disabled = false;
  updatePreview();
}

// LIVE PREVIEW UPDATE
function updatePreview() {
  const select = document.getElementById('template-select');
  const previewSection = document.getElementById('preview-section');
  const previewText = document.getElementById('preview-text');
  const customDateInput = document.getElementById('custom-date');
  
  if (!select.value) return;
  
  const template = currentTemplates[select.value];
  
  // DATUM BESTIMMEN (Custom oder heute)
  let dateToUse;
  if (customDateInput && customDateInput.value) {
    // Custom Datum formatieren (von YYYY-MM-DD zu DD.MM.YYYY)
    const customDate = new Date(customDateInput.value);
    dateToUse = customDate.toLocaleDateString('de-DE');
  } else {
    // Heutiges Datum
    dateToUse = new Date().toLocaleDateString('de-DE');
  }
  
  if (select.value === 'laser') {
    // HEADER MIT UNTERÜBERSCHRIFT
    const zusatzinfo = document.getElementById('zusatzinfo').value.trim();
    let result;
    
    if (zusatzinfo) {
      result = `Laser - ${zusatzinfo} - ${dateToUse}\n`;
    } else {
      result = `Laser-Haarentfernung - ${dateToUse}\n`;
    }
    
    // ZONEN DURCHGEHEN (nur Joule-Werte)
    let hasContent = false;
    template.zones.forEach(zone => {
      const jouleInput = document.querySelector(`.joule-input[data-zone="${zone}"]`);
      const joule = jouleInput ? jouleInput.value.trim() : '';
      
      if (joule) {
        result += `• ${zone}: ${joule} Joule\n`;
        hasContent = true;
      }
    });
    
    // NEUE LASER-FELDER
    const individualleAnmerkung = document.getElementById('laser-individuelle-anmerkung')?.value.trim() || '';
    const kostenpunkt = document.getElementById('laser-kostenpunkt')?.value.trim() || '';
    const einverstaendnis = document.getElementById('laser-einverstaendnis')?.value.trim() || '';
    const mitarbeiterin = document.getElementById('laser-mitarbeiterin')?.value.trim() || '';
    
    if (individualleAnmerkung) {
      result += `• Individuelle Anmerkung: ${individualleAnmerkung}\n`;
      hasContent = true;
    }
    if (kostenpunkt) {
      result += `• Kostenpunkt: ${kostenpunkt}\n`;
      hasContent = true;
    }
    if (einverstaendnis) {
      result += `• Einverständniserklärung & Gesundheitsfragen geklärt: ${einverstaendnis}\n`;
      hasContent = true;
    }
    if (mitarbeiterin) {
      result += `• Behandelnde Mitarbeiterin: ${mitarbeiterin}\n`;
      hasContent = true;
    }
    
    // TRENNLINIE AM ENDE
    if (hasContent) {
      result += `${'='.repeat(50)}\n`;
      previewText.textContent = result;
      previewSection.style.display = 'block';
    } else {
      previewSection.style.display = 'none';
    }
    
  } else {
    // STANDARD TEMPLATES
    const zusatzinfo = document.getElementById('zusatzinfo').value.trim();
    let result;
    
    if (zusatzinfo) {
      result = `${template.name} - ${zusatzinfo} - ${dateToUse}\n`;
    } else {
      result = `${template.name} - ${dateToUse}\n`;
    }
    
    const fields = document.querySelectorAll('[data-field]');
    let hasContent = false;
    
    fields.forEach((field, index) => {
      const value = field.value.trim();
      if (value) {
        const fieldName = template.fields[index].name;
        result += `• ${fieldName}: ${value}\n`;
        hasContent = true;
      }
    });
    
    // TRENNLINIE AM ENDE
    if (zusatzinfo || hasContent) {
      result += `${'='.repeat(50)}\n`;
      previewText.textContent = result;
      previewSection.style.display = 'block';
    } else {
      previewSection.style.display = 'none';
    }
  }
}

// KOPIEREN
async function copyToClipboard() {
  // Validierung der Pflichtfelder
  if (!validateRequiredFields()) {
    return;
  }
  
  const previewText = document.getElementById('preview-text');
  try {
    await navigator.clipboard.writeText(previewText.textContent);
    showNotification('✅ In Zwischenspeicher kopiert!', '#28a745');
  } catch (error) {
    console.error('Copy error:', error);
    showNotification('❌ Kopieren fehlgeschlagen', '#dc3545');
  }
}

// EINFÜGEN
function insertIntoTextarea() {
  // Validierung der Pflichtfelder
  if (!validateRequiredFields()) {
    return;
  }
  
  const previewText = document.getElementById('preview-text');
  const textarea = document.querySelector('#note_area') || 
                   document.querySelector('textarea[name*="note"]') ||
                   document.querySelector('textarea[placeholder*="notiz"]') ||
                   document.querySelector('textarea[placeholder*="Notiz"]') ||
                   document.querySelector('textarea') ||
                   document.querySelector('input[type="text"][name*="note"]');
  
  if (!textarea) {
    showNotification('❌ Notizfeld nicht gefunden', '#dc3545');
    return;
  }
  
  try {
    const currentText = textarea.value || '';
    const newText = currentText ? `${currentText}\n\n${previewText.textContent}` : previewText.textContent;
    
    textarea.value = newText;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    
    // AngularJS Integration (nur wenn verfügbar)
    try {
      if (typeof angular !== 'undefined' && angular.element) {
        const scope = angular.element(textarea).scope();
        if (scope && scope.$apply) {
          scope.$apply();
        }
      }
    } catch (angularError) {
      // AngularJS nicht verfügbar oder Fehler - das ist OK
      console.log('AngularJS Integration übersprungen:', angularError.message);
    }
    
    showNotification('✅ Text eingefügt! Modal bleibt für weitere Behandlungen offen.', '#28a745');
    
    // FORM RESET für nächste Behandlung
    resetForm();
    
  } catch (error) {
    console.error('Insert error:', error);
    showNotification('❌ Einfügen fehlgeschlagen', '#dc3545');
  }
}

// PFLICHTFELD VALIDIERUNG
function validateRequiredFields() {
  const select = document.getElementById('template-select');
  if (!select.value) return true;
  
  const emptyRequiredFields = [];
  
  if (select.value === 'laser') {
    // Laser-spezifische Pflichtfelder
    const kostenpunkt = document.getElementById('laser-kostenpunkt');
    const mitarbeiterin = document.getElementById('laser-mitarbeiterin');
    
    if (!kostenpunkt?.value.trim()) emptyRequiredFields.push('Kostenpunkt');
    if (!mitarbeiterin?.value.trim()) emptyRequiredFields.push('Behandelnde Mitarbeiterin');
  } else {
    // Standard-Template Pflichtfelder
    const template = currentTemplates[select.value];
    template.fields.forEach((field, index) => {
      if (field.required) {
        const fieldElement = document.querySelector(`[data-field="${index}"]`);
        if (!fieldElement?.value.trim()) {
          emptyRequiredFields.push(field.name);
        }
      }
    });
  }
  
  if (emptyRequiredFields.length > 0) {
    showNotification(`❌ Bitte füllen Sie folgende Pflichtfelder aus: ${emptyRequiredFields.join(', ')}`, '#dc3545');
    return false;
  }
  
  return true;
}

// FORM RESET
function resetForm() {
  const select = document.getElementById('template-select');
  const container = document.getElementById('template-content');
  const previewSection = document.getElementById('preview-section');
  const copyBtn = document.getElementById('copy-btn');
  const insertBtn = document.getElementById('insert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const customDateSection = document.getElementById('custom-date-section');
  const customDateInput = document.getElementById('custom-date');
  
  // TEMPLATE SELECTION ZURÜCKSETZEN
  select.value = '';
  container.innerHTML = '';
  previewSection.style.display = 'none';
  customDateSection.style.display = 'none';
  
  // CUSTOM DATE ZURÜCKSETZEN
  if (customDateInput) {
    customDateInput.value = '';
  }
  
  // BUTTONS VERSTECKEN
  copyBtn.style.display = 'none';
  insertBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  
  showNotification('🔄 Bereit für nächste Behandlung', '#6c757d');
}

// MODAL SCHLIEßEN
function closeModal() {
  const backdrop = document.getElementById('salon-templates-backdrop');
  if (backdrop) backdrop.remove();
  isModalOpen = false;
  document.removeEventListener('keydown', handleKeydown);
}

// KEYBOARD HANDLER
function handleKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

// NOTIFICATION
function showNotification(message, color) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${color};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: 500;
    z-index: 100001;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// PERIODISCHE BUTTON-PRÜFUNG
setInterval(() => {
  if (!isModalOpen && !document.getElementById('salon-templates-btn')) {
    injectButton();
  }
}, 5000);

console.log('✅ Salon Templates Complete - bereit');
