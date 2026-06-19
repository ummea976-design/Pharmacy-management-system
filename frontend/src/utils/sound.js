
// Simple beep sound using Web Audio API to avoid external file dependencies
// and handle play/pause race conditions
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const playBeep = (frequency = 1000, duration = 100, type = 'sine') => {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + (duration / 1000));

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + (duration / 1000));
    } catch (error) {
        console.error('Audio playback failed', error);
    }
};

export const playSuccessSound = () => {
    playBeep(800, 100);
    setTimeout(() => playBeep(1200, 100), 100);
};

export const playErrorSound = () => {
    playBeep(200, 300, 'sawtooth');
};
