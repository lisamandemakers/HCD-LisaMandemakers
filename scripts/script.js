let utterance;
let isSpeaking = false;
let annotations = [];

// Voorlezen starten/stoppen
function toggleSpeech() {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
    } else {
        const textContent = document.body.innerText;
        utterance = new SpeechSynthesisUtterance(textContent);
        utterance.lang = 'nl-NL';
        window.speechSynthesis.speak(utterance);
        isSpeaking = true;

        utterance.onend = () => {
            isSpeaking = false;
        };
    }
}

// Spatiebalk gebruiken om voorlezen te starten/stoppen
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleSpeech();
    }
});

// Spraaknotitie maken
function startDictation() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Deze browser ondersteunt geen spraakherkenning.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'nl-NL';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        addAnnotation(transcript, 'spraak');
    };

    recognition.onerror = function () {
        alert("Er ging iets mis met spraakherkenning.");
    };

    recognition.start();
}

// Handmatig notitie toevoegen
function addManualAnnotation() {
    const note = prompt("Typ hier je notitie:");
    if (note) {
        addAnnotation(note, 'handmatig');
    }
}

// Annotatie toevoegen
function addAnnotation(text, type) {
    const annotation = {
        id: Date.now(),
        text: text,
        type: type
    };
    annotations.push(annotation);
    renderAnnotations(annotations);
}

// Filter annotaties
function filterAnnotations(type) {
    if (type === 'alles') {
        renderAnnotations(annotations);
    } else {
        const filtered = annotations.filter(a => a.type === type);
        renderAnnotations(filtered);
    }
}

// Annotaties weergeven
function renderAnnotations(list) {
    const container = document.getElementById('annotations');
    container.innerHTML = '';
    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'annotation';
        div.textContent = `[${item.type.toUpperCase()}] ${item.text}`;
        container.appendChild(div);
    });
}

function addNoteFor(button) {
  const target = button.previousElementSibling || button.parentElement.querySelector('span') || button.parentElement;
  const content = target.innerText.trim();
  const note = prompt(`Notitie voor: "${content}"`);

  if (note) {
      const annotation = {
          text: note,
          reference: content,
          type: 'handmatig'
      };
      addAnnotation(annotation);
  }
}

function addAnnotation(annotation) {
  const container = document.getElementById('annotations');

  const div = document.createElement('div');
  div.className = 'annotation';
  div.innerHTML = `<strong>${annotation.reference}</strong><br>${annotation.text}`;
  container.appendChild(div);
}


// Tekstgrootte aanpassen
const fontSizeSlider = document.getElementById("fontSizeSlider");
const fontSizeValue = document.getElementById("fontSizeValue");

fontSizeSlider.addEventListener("input", () => {
  const size = fontSizeSlider.value + "px";
  document.querySelector("main").style.fontSize = size;
  fontSizeValue.innerText = size;
});

