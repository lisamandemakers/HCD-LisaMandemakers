let isPlaying = false;
let isPaused = false;
let fullTextUtterance = null;

function togglePlayPause() {
  if (isPlaying && !isPaused) {
    // Als het speelt: pauzeer
    window.speechSynthesis.pause();
    isPaused = true;
    document.querySelector('.play-button').textContent = '▶'; // Play icoon
  } else if (isPaused) {
    // Als gepauzeerd: hervat
    window.speechSynthesis.resume();
    isPaused = false;
    document.querySelector('.play-button').textContent = '||'; // Pauze icoon
  } else {
    // Als nog niet begonnen: begin opnieuw
    speakFullText();
  }
}

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


// 🖍️ HIGHLIGHTEN EN ANNOTATIES
function highlightSelection(colorName) {
  if (selectedTextElement) {
    selectedTextElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--' + colorName);
    selectedTextElement.style.color = 'black'; // tekstkleur zwart maken
    selectedColor = colorName;
  }
}


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

// 🗣️ SPRAAKCOMMANDO PLACEHOLDER
function toggleVoiceCommands() {
  alert('Spraakcommando\'s worden later toegevoegd!');
}

// 🔡 SLIDERS
document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
  document.getElementById('editable-text').style.fontSize = e.target.value + 'px';
});

document.getElementById('fontWeightSlider').addEventListener('input', (e) => {
  document.getElementById('editable-text').style.fontWeight = e.target.value;
});

// 🔁 FOCUS FUNCTIE PER ZIN
function addFocusListeners() {
  document.querySelectorAll('#editable-text span[tabindex]').forEach(span => {
    span.addEventListener('focus', () => {
      selectedTextElement = span;
    });
  });
}

// 🧠 SPLIT ZINNEN IN TABBARE SPANS
function splitIntoTabbableSpans() {
  const container = document.getElementById("editable-text");
  const text = container.innerText;

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g); // Splits op zinnen

  if (!sentences) return;

  container.innerHTML = ""; // Leegmaken

  sentences.forEach(sentence => {
    const span = document.createElement("span");
    span.textContent = sentence.trim();
    span.setAttribute("tabindex", "0");
    span.setAttribute("contenteditable", "true");
    container.appendChild(span);
    container.appendChild(document.createTextNode(" ")); // Spatie tussen zinnen
  });

  addFocusListeners(); // Geef nieuwe spans focus-event
}

// 🔤 SNELTOETSEN
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    document.querySelector('.navbar').focus();
  }
});

// 🚀 START BIJ LADEN
window.addEventListener("DOMContentLoaded", splitIntoTabbableSpans);


// 🖍️ SHORTCUTS TOETSEN 
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const activeTag = document.activeElement.tagName.toLowerCase();

  // ⛔ Voorkom dat bepaalde sneltoetsen werken als je in het inputveld typt
  const isTyping = activeTag === 'input' || activeTag === 'textarea';

  // 🔤 Focus op inputveld (altijd toegestaan)
  if (key === 'j') {
    document.getElementById('annotationText').focus();
    return;
  }

  // 🗣️ Spreek annotatie uit (toegestaan, zelfs als je in input zit)
  if (e.key === 'Shift') {
    const input = document.getElementById('annotationText').value.trim();
    if (input) {
      const utterance = new SpeechSynthesisUtterance(input);
      window.speechSynthesis.speak(utterance);
    }
    return;
  }

  // Sla de rest over als je in het inputveld typt
  if (isTyping) return;

  // 🎨 Highlight sneltoetsen
  if (key === 'g') {
    highlightSelection('mint');
  } else if (key === 'r') {
    highlightSelection('coral');
  } else if (key === 'y') {
    highlightSelection('lemon');
  } else if (key === 'p') {
    highlightSelection('lavender');
  }

  // ➕ Voeg annotatie toe
  if (key === 'f') {
    addAnnotation();
  }

  // ⌨️ Extra: focus navbar met toets C
  if (key === 'c') {
    document.querySelector('.navbar')?.focus();
  }
});


function toggleCategoryInput() {
  const form = document.getElementById("new-category-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function addNewCategory() {
  const name = document.getElementById("newCategoryName").value.trim();
  if (!name) return;

  // Kleuren voor de categorieën
  const colors = ['mint', 'coral', 'lemon', 'lavender'];
  const sidebar = document.querySelector(".annotation-sidebar");
  const existingCategories = sidebar.querySelectorAll('.category');
  const newIndex = existingCategories.length;
  const colorClass = colors[newIndex % colors.length];  // Dynamische kleur toewijzen

  // Categorie en lijst aanmaken
  const div = document.createElement("div");
  div.className = `category ${colorClass}`;  // Dynamische kleur
  div.contentEditable = true;
  div.setAttribute("onclick", `toggleCategory('${colorClass}')`);
  div.innerHTML = `${name} <span class="arrow">▼</span>`;

  // Maak een lege lijst voor deze categorie
  const ul = document.createElement("ul");
  ul.id = `${colorClass}-list`;
  ul.className = `${colorClass}-list`;

  // Voeg toe aan de sidebar
  sidebar.appendChild(div);
  sidebar.appendChild(ul);

  // Formulier resetten
  document.getElementById("newCategoryName").value = "";
  document.getElementById("new-category-form").style.display = "none";
}

function toggleCategory(colorName) {
  const list = document.getElementById(`${colorName}-list`);
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
}
