import { formatSpeechMathIndonesian } from './mathLogic';

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  rate: number; // 0.8, 1.0, 1.2, 1.5
  volume: number; // 0.0 to 1.0
  currentText: string;
}

type TTSListener = (state: TTSState) => void;

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<TTSListener> = new Set();
  private bestVoice: SpeechSynthesisVoice | null = null;
  private hasUserInteracted: boolean = false;

  private state: TTSState = {
    isPlaying: false,
    isPaused: false,
    isMuted: false,
    rate: 1.0,
    volume: 1.0,
    currentText: '',
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Look for id-ID (Indonesian) voice first
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) {
      this.bestVoice = idVoice;
    } else {
      // Fallback to default or English
      this.bestVoice = voices.find((v) => v.default) || voices[0] || null;
    }
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public setUserInteracted() {
    this.hasUserInteracted = true;
  }

  public speak(rawText: string, options?: { force?: boolean; rate?: number }) {
    if (!this.synth || this.state.isMuted) return;

    // Convert raw text and math equations into smooth Indonesian phonetic text
    const textToSpeak = formatSpeechMathIndonesian(rawText);
    if (!textToSpeak.trim()) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (this.bestVoice) {
      utterance.voice = this.bestVoice;
    }
    utterance.lang = 'id-ID';
    utterance.rate = options?.rate || this.state.rate;
    utterance.volume = this.state.volume;

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.isPaused = false;
      this.state.currentText = rawText;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = '';
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      // Ignore canceled errors which happen normally on stop()
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('TTS Speech error:', e);
      }
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onpause = () => {
      this.state.isPaused = true;
      this.notify();
    };

    utterance.onresume = () => {
      this.state.isPaused = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Could not speak utterance:', err);
    }
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.currentUtterance = null;
      this.notify();
    }
  }

  public replay() {
    if (this.state.currentText) {
      this.speak(this.state.currentText);
    }
  }

  public toggleMute() {
    const nextMuted = !this.state.isMuted;
    this.state.isMuted = nextMuted;
    if (nextMuted) {
      this.stop();
    }
    this.notify();
  }

  public setRate(newRate: number) {
    this.state.rate = newRate;
    this.notify();
    if (this.state.isPlaying && this.state.currentText) {
      this.speak(this.state.currentText);
    }
  }

  public setVolume(newVolume: number) {
    this.state.volume = Math.max(0, Math.min(1, newVolume));
    this.notify();
  }

  public getState(): TTSState {
    return { ...this.state };
  }
}

export const ttsService = new TTSService();
