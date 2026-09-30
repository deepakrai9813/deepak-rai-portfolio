// Web Speech API Interface for J.A.R.V.I.S. (Calm British Voice & Speech Recognition)

export function speakJarvis(text, onStart, onEnd) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 0.95; // Slightly lower, calm tone

  // Attempt to select a British English male voice
  const voices = window.speechSynthesis.getVoices();
  const britishVoice =
    voices.find((v) => v.lang === "en-GB" && (v.name.includes("Male") || v.name.includes("George") || v.name.includes("Oliver") || v.name.includes("Daniel"))) ||
    voices.find((v) => v.lang === "en-GB") ||
    voices.find((v) => v.lang.startsWith("en"));

  if (britishVoice) {
    utterance.voice = britishVoice;
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function initSpeechRecognition(onResult, onError) {
  if (typeof window === "undefined") return null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onResult?.(transcript);
    };

    recognition.onerror = (e) => {
      onError?.(e.error);
    };

    return recognition;
  } catch (e) {
    return null;
  }
}
