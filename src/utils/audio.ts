export class TimerAudio {
  private static instance: TimerAudio;
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private constructor() {}

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async play(): Promise<void> {
    try {
      await this.initializeAudioContext();

      console.log('AudioContext Initialized:', this.audioContext);
      
      if (!this.audioContext) {
        throw new Error('AudioContext not initialized');
      }

      // Create and configure oscillator
      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();
      
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 note
      
      // Configure gain (volume) envelope
      this.gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      
      
      // Connect nodes
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      //Removed .stop oscillator for continous sound
      
      // Start playing
      this.oscillator.start();

    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  stop(): void {
    this.cleanup()
  }

  private cleanup(): void {
    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (error) {
        console.log(error)
      }
      this.oscillator = null;
    }

    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }
}