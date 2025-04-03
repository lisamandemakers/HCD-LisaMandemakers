function startSpeech() {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
}
