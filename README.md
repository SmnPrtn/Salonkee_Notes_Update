# Salonkee_Notes_Update

# 🏥 Salon Templates Advanced - Chrome Extension

Eine professionelle Chrome Extension für **salonkee.at**, die strukturierte Behandlungsnotizen und umfassende Analyse-Templates für Kosmetikstudios und Schönheitssalons bereitstellt.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Chrome](https://img.shields.io/badge/chrome-extension-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ Features

- **📝 13+ Vorgefertigte Templates** für alle gängigen Behandlungen
- **🔍 Detaillierte Hautanalyse** mit 19 professionellen Feldern  
- **💪 Umfassende Bodyanalyse** für Körperbehandlungen
- **⚙️ Admin Panel** zum Erstellen eigener Templates
- **📅 Flexible Datumswahl** (heute oder individuell)
- **👀 Live-Vorschau** aller Eingaben
- **📋 Ein-Klick Kopieren & Einfügen**
- **✅ Pflichtfeld-Validierung**
- **📤 Import/Export** von Templates
- **🌐 Vollständig auf Deutsch**

## 🚀 Installation

### Option 1: Manuell (Entwicklermodus)
1. Laden Sie alle Dateien herunter
2. Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`
3. Aktivieren Sie den **Entwicklermodus** (rechts oben)
4. Klicken Sie auf **"Entpackte Erweiterung laden"**
5. Wählen Sie den Ordner mit den Extension-Dateien aus
6. Die Extension ist jetzt installiert! ✅

### Option 2: Chrome Web Store (geplant)
*Coming soon...*

## 📋 Verfügbare Templates

### 🔬 Analyse-Templates
- **🔍 Hautanalyse** - 19 detaillierte Felder für professionelle Hautberatung
- **💪 Bodyanalyse** - 17 Felder für Körperbehandlungen (Body FX, EvolveX)

### 💆‍♀️ Gesichtsbehandlungen  
- **💧 HydraFacial** - Signature, Deluxe, Premium
- **📍 Microneedling** - Classic, QMS, HydraFacial-Kombination
- **✨ IS Clinical Facial** - Fire & Ice, Enzyme-Behandlungen
- **👑 QMS Facial** - Collagen, Purifying, Detoxing
- **💨 JetPeel** - Classic und Kombinationsbehandlungen
- **🧪 Chemisches Peeling** - Prodigy Peel P2/P3
- **📚 Study & Glow Facial** - Spezielle Angebote für Studenten

### 🔥 Körperbehandlungen
- **⚡ Laser-Haarentfernung** - Alle Körperzonen mit Joule-Werten
- **🔥 Forma Thermolifting** - Zoneneinteilung und Intensitäten  
- **💪 Body FX / EvolveX** - Körperformung und Cellulite-Behandlung
- **🌊 Lymphdrainage** - Verschiedene Programme

### 🎨 Permanent Makeup
- **💄 Permanent Makeup** - Augenbrauen, Lippen, Eyeliner

## 🎯 Verwendung

### Grundlegende Nutzung
1. **Besuchen Sie salonkee.at** und loggen Sie sich ein
2. **Öffnen Sie eine Kundenakte** oder erstellen Sie einen neuen Termin
3. **Klicken Sie auf "📝 Behandlungsnotizen"** (erscheint automatisch beim Notizfeld)
4. **Wählen Sie eine Vorlage** aus dem Dropdown-Menü
5. **Füllen Sie die Felder aus** - Live-Vorschau zeigt das Ergebnis
6. **Kopieren oder Einfügen** mit einem Klick

### Erweiterte Features
- **📅 Individuelles Datum**: Wählen Sie ein anderes Datum als heute
- **✅ Pflichtfelder**: Werden automatisch validiert (rot markiert *)
- **🔄 Zurücksetzen**: "Neu"-Button für die nächste Behandlung
- **📄 Vorschau**: Sehen Sie das fertige Ergebnis vor dem Einfügen

## ⚙️ Admin Panel

Über das Extension-Icon erreichen Sie das Admin Panel mit erweiterten Funktionen:

### 📝 Templates Tab
- Übersicht aller benutzerdefinierten Templates
- Bearbeiten, Duplizieren, Löschen bestehender Templates

### ➕ Erstellen Tab  
- **Neues Template erstellen** mit beliebigen Feldern
- **Feldtypen**: Text, Nummer, Textfeld, Auswahlmenü
- **Live-Vorschau** während der Erstellung
- **Validation**: Pflichtfelder definieren

### ⚙️ Einstellungen Tab
- **Live-Vorschau** aktivieren/deaktivieren  
- **Auto-Copy** Funktion
- **Datumformat** wählen (DE/US/ISO)
- **Import/Export** von Templates
- **Daten-Management** (Reset, Löschen)

## 📊 Beispiel-Output

```
Hautanalyse - 16.06.2025
• Hauttyp: Mischhaut
• Hautzustand aktuell: Gestresst  
• Problemzonen: T-Zone, Kinn
• Unreinheiten: Mitesser
• Poren: Vergrößert
• Rötungen/Couperose: Leichte Rötungen an Wangen
• Bisherige Pflegeroutine: Morgens nur Wasser, abends Reinigungsmilch
• Aktuell verwendete Produkte: Drogerie-Reinigung
• UV-Schutz: Gelegentlich
• Hauptprobleme/Wünsche: Reinere Haut, verkleinerte Poren
• Heimpflege-Empfehlung: BHA-Toner 3x/Woche, täglicher SPF
• Behandlungsvorschlag: HydraFacial Serie (4x alle 2 Wochen)
• Einverständniserklärung & Gesundheitsfragen geklärt: Ja
• Behandelnde Mitarbeiterin: Elena
==================================================
```

## 🔧 Technische Details

### Systemanforderungen
- **Chrome Browser** Version 88 oder höher
- **Aktive Internetverbindung** für salonkee.at
- **Manifest V3** kompatibel

### Dateien-Struktur
```
salon-templates-extension/
├── manifest.json          # Extension-Konfiguration
├── content.js            # Haupt-Funktionalität 
├── popup.html            # Admin Panel Interface
├── popup.js              # Admin Panel Logik
├── admin-styles.css      # Styling für Admin Panel
├── options.html          # Optionen-Seite
└── README.md            # Diese Datei
```

### Unterstützte Seiten
- **Primär**: `*.salonkee.at/*`
- Automatische Erkennung von Notizfeldern auf allen Salonkee-Seiten

## 🔒 Datenschutz & Sicherheit

- **Keine Datensammlung**: Alle Daten bleiben lokal im Browser
- **Keine externen Server**: Extension funktioniert komplett offline
- **Sichere Speicherung**: Chrome's `storage.local` API
- **Kein Tracking**: Keine Analyse oder Überwachung

### Berechtigungen
- `storage` - Für lokale Template-Speicherung
- `activeTab` - Für Interaktion mit salonkee.at
- `host_permissions` - Nur für salonkee.at Domain

## 🛠️ Entwicklung & Anpassung

### Eigene Templates hinzufügen
Sie können eigene Templates entweder über das Admin Panel erstellen oder direkt im Code hinzufügen:

```javascript
'my-template': {
  name: 'Mein Template',
  icon: '🎯',
  fields: [
    { name: 'Feldname', type: 'text', placeholder: 'Platzhalter' },
    { name: 'Auswahl', type: 'select', options: ['Option 1', 'Option 2'] },
    { name: 'Pflichtfeld', type: 'text', required: true }
  ]
}
```

### Lokale Entwicklung
```bash
# Repository klonen
git clone [repository-url]

# In Chrome laden (Entwicklermodus)
# chrome://extensions/ -> "Entpackte Erweiterung laden"
```

## 🐛 Bekannte Probleme & Lösungen

### Problem: Button erscheint nicht
**Lösung**: 
- Seite neu laden (F5)
- Prüfen Sie, ob Sie auf einer salonkee.at Seite sind
- Extension aktiviert? Prüfen Sie `chrome://extensions/`

### Problem: Templates werden nicht gespeichert  
**Lösung**:
- Browser-Cache leeren
- Extension deinstallieren und neu installieren
- Chrome-Sync deaktivieren falls Probleme

### Problem: Einfügen funktioniert nicht
**Lösung**:
- Prüfen Sie, ob das Notizfeld fokussiert ist
- Bei Angular-Seiten: Warten Sie 2-3 Sekunden nach dem Laden
- Versuchen Sie "Kopieren" und manuelles Einfügen (Strg+V)

## 📞 Support & Kontakt

Bei Fragen, Problemen oder Verbesserungsvorschlägen:

- **GitHub Issues**: [Link zum Repository]
- **E-Mail**: [Ihre E-Mail]
- **Dokumentation**: Diese README-Datei

## 🔄 Changelog

### Version 2.0 (Aktuell)
- ✅ Erweiterte Hautanalyse (19 Felder)
- ✅ Neue Bodyanalyse-Vorlage (17 Felder)  
- ✅ Verbessertes Admin Panel
- ✅ Import/Export Funktionalität
- ✅ Pflichtfeld-Validierung
- ✅ Live-Vorschau für alle Templates

### Version 1.0
- ✅ Grundlegende Templates (Laser, HydraFacial, etc.)
- ✅ Ein-Klick Einfügen
- ✅ Basis Admin Panel

## 📜 Lizenz

MIT License - Siehe [LICENSE](LICENSE) Datei für Details.

---

**Entwickelt mit ❤️ für professionelle Kosmetikstudios**

*Diese Extension wurde speziell für die Verwendung mit salonkee.at entwickelt und ist nicht offiziell von Salonkee endorsed.*
