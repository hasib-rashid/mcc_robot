const introText = "Hello! I am your voice-enabled AI assistant. my self orion. I am created by cadet alom.";
const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

const leftEar = document.getElementById('left-ear');
const rightEar = document.getElementById('right-ear');
const mouth = document.getElementById('mouth');

function animateListening(state) {
  leftEar.classList.toggle('listen', state);
  rightEar.classList.toggle('listen', state);
}

function animateSpeaking(state) {
  mouth.classList.toggle('speak', state);
}

function speak(text) {
  if (synth.speaking) {
    synth.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.onstart = () => animateSpeaking(true);
  utterance.onend = () => animateSpeaking(false);
  synth.speak(utterance);
}

document.getElementById('btnIntro').onclick = () => {
  speak(introText);
};

document.getElementById('btnAsk').onclick = () => {
  animateListening(true);
  recognition.start();
};

document.getElementById('btnStop').onclick = () => {
  if (synth.speaking) {
    synth.cancel();
    animateSpeaking(false);
  }
};

recognition.onresult = (event) => {
  const userQuestion = event.results[0][0].transcript;
  animateListening(false);

  // Ask Puter.ai
  puter.ai.chat(userQuestion).then(response => {
    console.log("AI:", response);
    speak(response);
  }).catch(error => {
    console.error("Puter.ai error:", error);
    speak("Sorry, I couldn't get an answer.");
  });
};

recognition.onend = () => {
  animateListening(false);
};

recognition.onerror = (e) => {
  animateListening(false);
  console.error("Speech recognition error:", e);
  speak("Sorry, I couldn't hear that.");
};
