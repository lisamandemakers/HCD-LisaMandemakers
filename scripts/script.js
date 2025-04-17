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
