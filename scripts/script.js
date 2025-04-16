document.querySelectorAll('#textBox p[tabindex]').forEach(p => {
  p.addEventListener('focus', () => {
    selectedTextElement = p;
  });
});

function speakSelected() {
  if (selectedTextElement) {
    const msg = new SpeechSynthesisUtterance(selectedTextElement.textContent);
    window.speechSynthesis.speak(msg);
  }
}

document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
  document.getElementById('textBox').style.fontSize = e.target.value + 'px';
});

document.getElementById('fontWeightSlider').addEventListener('input', (e) => {
  document.getElementById('textBox').style.fontWeight = e.target.value;
});

function highlightSelection(colorName) {
  if (selectedTextElement) {
    selectedTextElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--' + colorName);
    selectedColor = colorName;
  }
}

function addAnnotation() {
  if (!selectedTextElement || !selectedColor) return;

  const text = document.getElementById('annotationText').value;
  if (!text.trim()) return;

  const ul = document.getElementById(`${selectedColor}-list`);
  const li = document.createElement('li');
  li.textContent = `\"${selectedTextElement.textContent.trim()}\" → ${text}`;
  ul.appendChild(li);

  document.getElementById('annotationText').value = '';
}

function toggleCategory(colorName) {
  const list = document.getElementById(`${colorName}-list`);
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

function toggleVoiceCommands() {
  alert('Spraakcommando\'s worden later toegevoegd!');
}

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    document.querySelector('.navbar').focus();
  }
});


let isPlaying = false;
let currentSpeechSynthesisUtterance = null;
let selectedTextElement = document.getElementById('selected-text');

function togglePlayPause() {
    if (isPlaying) {
        window.speechSynthesis.pause();
        document.querySelector('.play-button').textContent = '▶'; // Zet naar play
    } else {
        if (currentSpeechSynthesisUtterance) {
            window.speechSynthesis.resume();
        } else {
            speakSelected();
        }
        document.querySelector('.play-button').textContent = '||'; // Zet naar pauze
    }

    isPlaying = !isPlaying;
}

function speakSelected() {
    if (selectedTextElement) {
        currentSpeechSynthesisUtterance = new SpeechSynthesisUtterance(selectedTextElement.textContent);
        window.speechSynthesis.speak(currentSpeechSynthesisUtterance);
        currentSpeechSynthesisUtterance.onend = () => {
            isPlaying = false;
            document.querySelector('.play-button').textContent = '▶'; // Zet naar play als het klaar is
        };
    }
}