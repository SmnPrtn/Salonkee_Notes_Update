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
    'hautanalyse': {
      name: 'Hautanalyse',
      icon: '🔍',
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
    background: #1a1a1a;
    color: white;
    border: none;
    padding: 12px 20px;
    margin: 8px 4px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  `;
  
  button.addEventListener('mouseenter', () => {
    button.style.background = '#000';
    button.style.transform = 'translateY(-1px)';
    button.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.background = '#1a1a1a';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
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
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
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
    border-radius: 16px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba(0,0,0,0.2);
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  `;
  
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 24px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">🏥 Behandlungsnotizen</h3>
      <button id="close-modal" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.15s ease; display: flex; align-items: center; justify-content: center;">✕</button>
    </div>
    
    <div style="padding: 24px; max-height: 60vh; overflow-y: auto;">
      <div style="margin-bottom: 24px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Behandlung auswählen:</label>
        <select id="template-select" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; background: white; transition: all 0.15s ease;">
          <option value="">-- Vorlage wählen --</option>
          ${Object.entries(currentTemplates).map(([key, template]) => 
            `<option value="${key}">${template.icon} ${template.name}</option>`
          ).join('')}
        </select>
      </div>
      
      <div id="custom-date-section" style="display: none; margin-bottom: 24px; background: #f8f9fa; padding: 16px; border-radius: 12px; border: 1px solid #e1e4e8;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">📅 Individuelles Datum (optional):</label>
        <input type="date" id="custom-date" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white;">
        <small style="color: #6a737d; font-size: 12px; margin-top: 6px; display: block;">Leer lassen für heutiges Datum</small>
      </div>
      
      <div id="template-content"></div>
      
      <div id="preview-section" style="display: none; background: #f8f9fa; padding: 16px; border-radius: 12px; margin-top: 24px; border: 1px solid #e1e4e8;">
        <h4 style="margin: 0 0 12px 0; color: #6a737d; font-size: 14px; font-weight: 500;">📄 Vorschau:</h4>
        <pre id="preview-text" style="background: white; padding: 16px; border-radius: 8px; font-size: 12px; margin: 0; white-space: pre-wrap; max-height: 200px; overflow-y: auto; font-family: ui-monospace, 'SF Mono', Monaco, monospace; line-height: 1.4; color: #424242; border: 1px solid #e1e4e8;"></pre>
      </div>
    </div>
    
    <div style="padding: 24px; border-top: 1px solid #e1e4e8; display: flex; gap: 12px; background: #fafbfc;" id="modal-buttons">
      <button id="copy-btn" style="flex: 1; background: #059669; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; display: none; transition: all 0.15s ease;" disabled>📋 Kopieren</button>
      <button id="insert-btn" style="flex: 1; background: #1a1a1a; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; display: none; transition: all 0.15s ease;" disabled>➕ Einfügen</button>
      <button id="reset-btn" style="background: #6a737d; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; display: none; transition: all 0.15s ease;">🔄 Neu</button>
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
  
  // Hover effects für buttons
  const buttons = [copyBtn, insertBtn, resetBtn, closeBtn];
  buttons.forEach(btn => {
    if (btn) {
      btn.addEventListener('mouseenter', () => {
        if (!btn.disabled) {
          btn.style.transform = 'translateY(-1px)';
          btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = 'none';
      });
    }
  });
  
  // Focus styles für select
  templateSelect.addEventListener('focus', () => {
    templateSelect.style.borderColor = '#0366d6';
    templateSelect.style.boxShadow = '0 0 0 3px rgba(3, 102, 214, 0.1)';
  });
  templateSelect.addEventListener('blur', () => {
    templateSelect.style.borderColor = '#d1d5da';
    templateSelect.style.boxShadow = 'none';
  });
  
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
      <div style="margin-bottom: 24px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Zusatzinfo:</label>
        <input type="text" id="zusatzinfo" placeholder="z.B. 'Kurbehandlung 4/4'" 
               style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;">
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
          🎯 Behandelte Zonen
        </h4>
        <div id="zones-container">
          ${template.zones.map(zone => `
            <div class="zone-item" style="background: #f8f9fa; border: 1px solid #e1e4e8; border-radius: 12px; margin-bottom: 16px; padding: 16px; transition: all 0.15s ease;">
              <h5 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 14px; font-weight: 500; border-bottom: 1px solid #e1e4e8; padding-bottom: 8px;">${zone}:</h5>
              <input type="number" placeholder="Joule-Wert" class="joule-input" data-zone="${zone}"
                     style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;">
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Individuelle Anmerkung:</label>
        <input type="text" id="laser-individuelle-anmerkung" placeholder="Weitere Anmerkungen" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Kostenpunkt (Pflichtfeld!): <span style="color: #dc2626;">*</span></label>
        <input type="text" id="laser-kostenpunkt" placeholder="z.B. 120 €" required style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Einverständniserklärung & Gesundheitsfragen geklärt:</label>
        <select id="laser-einverstaendnis" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; background: white; transition: all 0.15s ease;">
          <option value="">-- Auswählen --</option>
          <option value="Ja">Ja</option>
          <option value="Nein">Nein</option>
        </select>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Behandelnde Mitarbeiterin (Pflichtfeld!): <span style="color: #dc2626;">*</span></label>
        <select id="laser-mitarbeiterin" required style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; background: white; transition: all 0.15s ease;">
          <option value="">-- Auswählen --</option>
          <option value="Alina">Alina</option>
          <option value="Elena">Elena</option>
          <option value="Kathrin">Kathrin</option>
          <option value="Pia">Pia</option>
        </select>
      </div>
    `;
    
  } else {
    // ANDERE TEMPLATES (Standard-Felder) - inkl. Hautanalyse und Bodyanalyse
    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">Zusatzinfo:</label>
        <input type="text" id="zusatzinfo" placeholder="z.B. 'Kur 3/6', 'Nachbehandlung', etc." 
               style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;">
      </div>
    ` + template.fields.map((field, index) => {
      const requiredLabel = field.required ? ' <span style="color: #dc2626;">*</span>' : '';
      const requiredAttr = field.required ? ' required' : '';
      
      if (field.type === 'select') {
        return `
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <select data-field="${index}" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; background: white; transition: all 0.15s ease;"${requiredAttr}>
              <option value="">-- Auswählen --</option>
              ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>
        `;
      } else if (field.type === 'textarea') {
        return `
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <textarea data-field="${index}" placeholder="${field.placeholder}" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; min-height: 80px; resize: vertical; box-sizing: border-box; background: white; transition: all 0.15s ease;"${requiredAttr}></textarea>
          </div>
        `;
      } else {
        return `
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1a1a1a; font-size: 14px;">${field.name}:${requiredLabel}</label>
            <input type="${field.type}" data-field="${index}" placeholder="${field.placeholder}" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5da; border-radius: 8px; font-size: 14px; box-sizing: border-box; background: white; transition: all 0.15s ease;"${requiredAttr}>
          </div>
        `;
      }
    }).join('');
  }
  
  // FOCUS STYLES für alle Inputs hinzufügen
  container.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.borderColor = '#0366d6';
      element.style.boxShadow = '0 0 0 3px rgba(3, 102, 214, 0.1)';
    });
    element.addEventListener('blur', () => {
      element.style.borderColor = '#d1d5da';
      element.style.boxShadow = 'none';
    });
    
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
    
  } else if (select.value === 'forma') {
    // FORMA HEADER MIT UNTERÜBERSCHRIFT
    const zusatzinfo = document.getElementById('zusatzinfo').value.trim();
    let result;
    
    if (zusatzinfo) {
      result = `Forma - ${zusatzinfo} - ${dateToUse}\n`;
    } else {
      result = `Forma Thermolifting - ${dateToUse}\n`;
    }
    
    // FORMA ZONEN DURCHGEHEN
    let hasContent = false;
    template.zones.forEach(zone => {
      const formaInput = document.querySelector(`.forma-input[data-zone="${zone}"]`);
      const anmerkungenInput = document.querySelector(`.forma-anmerkungen-input[data-zone="${zone}"]`);
      
      const intensitaet = formaInput ? formaInput.value.trim() : '';
      const anmerkungen = anmerkungenInput ? anmerkungenInput.value.trim() : '';
      
      if (intensitaet || anmerkungen) {
        result += `• ${zone}:`;
        if (intensitaet) result += ` ${intensitaet}`;
        if (anmerkungen) result += ` (${anmerkungen})`;
        result += `\n`;
        hasContent = true;
      }
    });
    
    // FORMA STANDARD-FELDER
    const fields = document.querySelectorAll('[data-field]');
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
    
  } else {
    // STANDARD TEMPLATES (inkl. Hautanalyse und Bodyanalyse)
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
    showNotification('✅ In Zwischenspeicher kopiert!', '#059669');
  } catch (error) {
    console.error('Copy error:', error);
    showNotification('❌ Kopieren fehlgeschlagen', '#dc2626');
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
    showNotification('❌ Notizfeld nicht gefunden', '#dc2626');
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
    
    showNotification('✅ Text eingefügt! Modal bleibt für weitere Behandlungen offen.', '#059669');
    
    // FORM RESET für nächste Behandlung
    resetForm();
    
  } catch (error) {
    console.error('Insert error:', error);
    showNotification('❌ Einfügen fehlgeschlagen', '#dc2626');
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
  } else if (select.value === 'forma') {
    // Forma-spezifische Pflichtfelder (aus fields)
    const template = currentTemplates[select.value];
    template.fields.forEach((field, index) => {
      if (field.required) {
        const fieldElement = document.querySelector(`[data-field="${index}"]`);
        if (!fieldElement?.value.trim()) {
          emptyRequiredFields.push(field.name);
        }
      }
    });
  } else {
    // Standard-Template Pflichtfelder (inkl. Hautanalyse und Bodyanalyse)
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
    showNotification(`❌ Bitte füllen Sie folgende Pflichtfelder aus: ${emptyRequiredFields.join(', ')}`, '#dc2626');
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
  
  showNotification('🔄 Bereit für nächste Behandlung', '#6a737d');
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
    border-radius: 8px;
    font-weight: 500;
    z-index: 100001;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    min-width: 280px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animation
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// PERIODISCHE BUTTON-PRÜFUNG
setInterval(() => {
  if (!isModalOpen && !document.getElementById('salon-templates-btn')) {
    injectButton();
  }
}, 5000);

console.log('✅ Salon Templates Complete - bereit');
