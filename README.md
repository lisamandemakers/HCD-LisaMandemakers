# HCD Document – Lisa Mandemakers

## De opdracht
Mijn testpersoon is Roger. Roger is 58 jaar oud en heeft maculadegeneratie, een erfelijke en progressieve oogaandoening. Zijn zicht is ernstig beperkt – hij ziet alleen nog om een soort ‘koker’ heen. Hij studeert filosofie en wil graag op een toegankelijke manier annotaties kunnen maken in digitale boeken, en deze eenvoudig kunnen terugvinden.

---

## Week 1 

### Voorbereide vragen
- Wat doe je momenteel om annotaties te maken?
- Wat voor annotaties maak je?
- Welke screenreader gebruik je (VoiceOver, JAWS, NVDA)?
- Wat zijn je grootste uitdagingen bij het maken van aantekeningen?
- Hoe zou je het liefst aantekeningen maken (typen, dicteren, audio-opnames, favorieten)?
- Hoe wil je de aantekeningen het liefst opslaan?
- Hoe lees je momenteel je boeken? Wat is je studie/leesroutine?
- Welke tools gebruik je momenteel allemaal?
- Hoe vind je je annotaties momenteel terug?
- Kun je een stukje laten horen uit je screenreader?

### Observaties & inzichten

#### Algemene info
- Leeftijd: 58
- Oogaandoening: erfelijke maculadegeneratie (progressief)
- Slechts 1% zicht links, rest wazig en vermoeiend
- Omgekeerde kokervisie

#### Dagelijks gebruik
- Screenreaders: iPhone VoiceOver, NVDA, Supernova
- Annoteren met handschrift in schriftjes (helpt bij onthouden)
- Hable One: 6-knops braille-invoer
- Lezen via Passend Lezen (langzame levertijd)

#### Problemen & frustraties
- Energieverlies door visuele vermoeidheid
- Spraak-naar-tekst levert rommelige zinnen op
- Eyetracking te vermoeiend
- Screenreader mist soms cruciale info (frustrerend)
- Geen goede manier om annotaties terug te vinden

#### Wensen & doelen
- Annoteren met stem, opslaan per zin of woord
- Annotaties kunnen voorlezen
- Heldere koppenstructuur in tekst
- Donkere modus, groot en dik lettertype
- Geel-op-zwart is prettig
- Combineerbare tools (niet afhankelijk van één)

### Eerste ideeën & aanpak

#### Prototype-aanpak
- Test meerdere oplossingen per probleem
- Gebruik lo-fi/Wizard of Oz methode
- Bouw kleine testjes met focus op inzicht

#### Technische ideeën
- Gebruik terminal commando `say` om stem te simuleren
- Simuleer meerdere manieren van invoer: typen, dicteren, audio, favorieten
- HTML naar Word converter overwegen

#### Ontwerpuitgangspunten
- Donkere modus als standaard
- Grote, dikke typografie
- Annotaties zichtbaar én hoorbaar
- Navigatie via koppen en screenreader
- Feedback bij aanwezigheid van annotatie

---
## Week 2 

In week 2 ben ik verder gaan werken om het idee wat ik tijdens test 1 heb kunnen ontwikkelen en bedacht. Ik heb er voor gekozen om een groot text vak te maken en daar naast wil ik dan een sidebar maken met annotaties. De grote vraag voor mij was, "hoe kan ik de annotaties makkelijk maken?" ik dacht er zelf aan om per zin een knopje toe te voegen zodat je daar op kunt klikken en doorgestuurd werd naar een type input waar je vervolgens je annotatie kon invoeren. Hier even een schetsje: ![schets-1](/readme-img/schets1.JPG)

### Belangrijke bevindingen over toegankelijkheid (hoorcollege notes)

#### Feiten
- 1 op de 6 mensen heeft moeite met lezen
- 70% van de dove mensen is functioneel ongeletterd
- Lezen kost veel energie ("Reading = effort")
- Gebarentaal heeft geen geschreven vorm, wat lezen nog moeilijker maakt

#### Webtoegankelijkheid verbeteren
- Gebruik duidelijke headings
- Houd teksten kort en bondig
- Gebruik afbeeldingen en multimedia ter ondersteuning (visual translation)
- Gebruik ondertiteling of closed captions:
  - *Ondertiteling:* vertaalt de gesproken taal
  - *Closed captions:* bevat ook geluidsinfo en stem-emotie (boost ook video SEO)
- Bied meerdere contactmogelijkheden aan

---

### Designproces & Test 2
Na het maken van mijn schets ben ik direct begonnen in Visual Studio om de eerste mogelijke applicatie voor Roger te bouwen omdat we die woensdag gelijk weer moesten testen. Ik wilde de contrast kleuren heel hoog houden voor Roger dus koos voor een zwarte achtergrond met gele letters want hij heeft zelf aan gegeven dat het fijnst te vinden. Hier een afbeelding van mijn applicatie voor test nr.2 
![schets-1](/readme-img/prototype1.png)

### Speech API 

```js 
function speakFullText() {
  const text = document.getElementById('editable-text').innerText;

  if (!text.trim()) return;

  fullTextUtterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(fullTextUtterance);

  isPlaying = true;
  isPaused = false;
  document.querySelector('.play-button').textContent = '||';

  fullTextUtterance.onend = () => {
    isPlaying = false;
    isPaused = false;
    document.querySelector('.play-button').textContent = '▶';
  };
}
```

Deze functie haalt de tekst op uit het element met het ID editable-text en gebruikt de SpeechSynthesisUtterance API om de tekst hardop voor te lezen. Als de tekst niet leeg is, start ik de voorlezing. Ik zet de status op "afspelen" en verander de knoptekst naar het pauze-icoon. Zodra de voorlezing is afgelopen, zet ik de status weer op "niet aan het spelen" en wijzig ik de knoptekst terug naar het afspeel-icoon





#### Testvragen (observatie)
- “Wat verwacht je dat er gebeurt als je hier klikt?”
- “Wat vind je van de plaats van deze knop?”
- “Wat ga je nu doen? Waarom?”
- “Wat denk je dat deze functie doet?”
- “Zou je dit makkelijk kunnen gebruiken zonder uitleg?”

#### Reflectievragen (na afloop)
1. **Algemene indruk**
   - Wat vond je van de applicatie?
   - Eerste indruk van het ontwerp?
2. **Gebruiksgemak**
   - Was het duidelijk wat je moest doen?
   - Was de interface logisch?
3. **Functies**
   - Voorleesfunctie bruikbaar?
   - Annotaties maken makkelijk?
   - Tekst aanpassen nuttig?
4. **Verbeterpunten**
   - Wat frustreerde je?
   - Wat zou jij verbeteren?
5. **Waarde**
   - Zou je het gebruiken? Waarom wel/niet?

---

### Roger's inzichten uit test 2

Mike heeft mijn hele test gefilmd en na opnieuw bekijken van de video ben ik uit deze inzichten gekomen:


#### Toegankelijkheid en Leesbaarheid
- Invert-opties met linten werken verwarrend
- Tekst vergroten heeft weinig effect
- Outlines van tabs moeten duidelijker
- Emojis op knoppen: wit op geel werkt niet (slecht contrast)

#### Navigatie en Interactie
- Zijmenu met opties: enthousiast over
- Via Tab naar annotaties kunnen navigeren
- Per zin markeren is een grote wens

#### Spraak en Voorlezen
- Knop om eigen annotaties te laten voorlezen gewenst
- Invoer via spraak moet zichtbaar zijn, liefst per woord

#### Annotaties en Markering
- Annotaties in aparte kleur
- Markeren met border werkt beter dan highlight
- Willekeurig bestaande annotaties kunnen toevoegen

#### Tactiele Interactie
- F- en G-toetsen zijn voelbaar en helpen bij oriëntatie

#### Visuele Ondersteuning
- Visuele/abstracte illustraties helpen bij begrip

---

### Wat ik nu ga doen voor de applicatie
- Tekst vergroten-optie behouden
- Tab-outlines verbeteren
- Knoppen met symbolen + alt-tekst
- Zijmenu met instellingen toevoegen
- Spraakcommando's implementeren
- Shortcuts voor annotatie-navigatie
- Per zin kunnen markeren
- Voorleesfunctie voor eigen tekst
- Annotaties in kleuren
- Illustraties toevoegen (idee: AI-generatie uit tekst)

---

## Week 3 
In week 3 wilde ik het echt anders gaan aanpakken want na de eerste echte test te hebben gedaan met Roger kwmam ik zoals hier boven te zien is toch achter een heleboel dingen. Ik heb even in XD een wireframe gemaakt om toch even in te zien waar ik precies naartoe wilde en een visueel overzicht te creeëren. ZO zag dat er uit: ![XD-schets](/readme-img/digitalschets.png)


### Annoteren op kleur
```js
function highlightSelection(colorName) {
  if (selectedTextElement) {
    selectedTextElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--' + colorName);
    selectedTextElement.style.color = 'black'; // tekstkleur zwart maken
    selectedColor = colorName;
  }
}
```
Deze functie markeert de geselecteerde tekst met een achtergrondkleur die is opgehaald uit de CSS-variabele --<colorName>. Als er tekst is geselecteerd, pas ik de achtergrondkleur en de tekstkleur aan, waarbij de tekst zwart wordt gemaakt. Ik sla de gekozen kleur op in de variabele selectedColor, zodat ik weet welke kleur is gebruikt voor de markering.

```js
function addAnnotation() {
  if (!selectedTextElement || !selectedColor) return;

  const text = document.getElementById('annotationText').value;
  if (!text.trim()) return;

  const ul = document.getElementById(`${selectedColor}-list`);
  const li = document.createElement('li');
  li.textContent = `"${selectedTextElement.textContent.trim()}" → ${text}`;
  ul.appendChild(li);

  document.getElementById('annotationText').value = '';
}

function toggleCategory(colorName) {
  const list = document.getElementById(`${colorName}-list`);
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
}
```

Deze twee functies voegen annotaties toe aan de geselecteerde tekst en beheren de zichtbaarheid van annotatiecategorieën.

addAnnotation: Als er tekst is geselecteerd en een kleur is gekozen, voeg ik een annotatie toe aan de lijst die bij de geselecteerde kleur hoort. De annotatie bestaat uit de geselecteerde tekst en de bijbehorende opmerking die ik in een invoerveld heb ingevoerd. Daarna wordt het invoerveld geleegd.

toggleCategory: Deze functie verandert de zichtbaarheid van de lijst van annotaties voor een bepaalde kleurcategorie. Als de lijst verborgen is, wordt deze zichtbaar, en anders wordt de lijst verborgen.


### Planning
- Spraakcommando’s laten werken
- Kunnen selecteren hoeveel zinnen je markeert
- Kleuren koppelen aan toetsen (R = rood, B = blauw, P = paars)

### Test 3 inzichten
- Kleuren knoppen waren te groot
- Hij wilt de annotaties graag zelf kunnen aanpassen en selecteren
- Hij wilt losse woordjes kunnen markeren
- Tab rand opvallender
- Annotatie gedeelte groter
- Sliders mooi geel maken


#### Visuele en structurele verbeteringen
- Kleurenknoppen waren te groot
- Rand/tab van annotatie-tab moet opvallender
- Annotatieblok groter maken
- Sliders in opvallend geel
- Contrast bij tekstinvoer verbeteren

#### Voortgang gesprek met Vasilis
- Niet alles tegelijk willen testen
- Eerst focussen op 1 duidelijke feature
- Bedenk en vraag wat Roger een fijne volgorde vind van annotaties maken
- Shift-knop laat tekst voorlezen die je hebt getypt
- Annotaties moeten aanpasbaar zijn
- Willekeurige volgorde van annotaties testen

---

## Week 4 

In week 4 heb ik mijn laatste test gehad. Mijn interface zag er zo uit:
uit: ![eind-interface](/readme-img/eindinterface.png)

Ik heb ik dit design de Roger de keuze gegeven om een categorie voor zijn annotaties toetevoegen, omdat hij in est 3 aangaf dat het te druk was voor zijn doen.   ![voeg-categorie-toe](/readme-img/addcategory.png)

Eenmaal een categorie toegevoedgd ziet dat er zo uit:
 ![categorie-toegevoegd](/readme-img/addedcat.png)


### Test 4 resultaten
- Meer overzicht werd als prettig ervaren  
- Categorieën in annotaties toevoegen werd benoemd als wens  
- Lettergrootte voor categorieën nog wat klein  
De mogelijkheid om tekst in meerdere categorieën te plaatsen werd als nuttig beschouwd

Enkele gebruikers gaven aan dat ze een optie zouden willen om annotaties te exporteren

De spraakfunctie werd gewaardeerd, maar er werd gevraagd om meer controle over de snelheid van de voorlezing

### Reflectie op Exclusive Design principles

#### KeyBoard 
In deze fase lag de focus op de ervaring van Roger, met bijzondere aandacht voor de interactie via het toetsenbord. De verbeterde annotatiestructuur en sneltoetsen zijn ontworpen op basis van zijn feedback, waarbij zijn behoefte aan efficiëntie en overzicht centraal stond. Door toetsenbordnavigatie mogelijk te maken, kan Roger sneller door de tekst en annotaties navigeren, wat zijn controle en gebruiksgemak vergroot.

#### Prioritise identity
De keuzes in contrast, typografie en visuele ondersteuning sluiten aan bij Roger's persoonlijke voorkeuren en visuele behoeftes, wat zijn identiteit als gebruiker centraal stelt.

#### Add nonsense
Dingen groter maken dan, dat je denkt dat nodig is

#### Whitespace and clarity
In deze fase is er extra aandacht besteed aan het gebruik van white space, zodat Roger zich niet overweldigd voelt door te veel visuele informatie. Door voldoende ruimte tussen elementen te creëren, krijgt de interface een ademende en overzichtelijke uitstraling.

### Wat ik zou doen met meer tijd
Als ik nog extra tijd had om de applicatie verder uit te breiden, zou ik:
- **AI-integratie ontwikkelen** die tekst automatisch vertaalt naar visuele illustraties ter ondersteuning van de inhoud.
- **Spraakherkenning optimaliseren**, zodat woorden per stuk worden herkend en weergegeven, wat meer controle geeft over het invoerproces.
- **Een feedbacksysteem inbouwen**, zodat gebruikers hun ervaring direct kunnen terugkoppelen en ik het ontwerp op basis daarvan verder kan aanpassen.
- **Ondersteuning voor meerdere talen** implementeren, inclusief Nederlandse Gebarentaal (NGT) via video of avatar.
- **Meer aanpassingsopties voor de interface** toevoegen, zoals kleurenschema’s, lettertypen en lay-outs, om zo nog beter aan persoonlijke voorkeuren te voldoen.
