"use client";

/** Web Audio API ambient swell generator — creates spatial audio feedback on hover interactions. */
class AmbientSwellGenerator extends EventTarget {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  public isInitialized = false;
  public isMuted = true; // Start muted — user must explicitly unmute

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.dispatchEvent(new Event("muteChange"));
    this.playToggleSound(!this.isMuted);

    if (!this.isMuted && !this.isInitialized) {
      this.init();
    }
  }

  private playToggleSound(isTurningOn: boolean) {
    if (typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const startFreq = isTurningOn ? 440 : 880;
    const endFreq = isTurningOn ? 880 : 440;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.1);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.linearRampToValueAtTime(0, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public play() {
    if (typeof window === "undefined" || this.isMuted) return;
    if (this.isPlaying) return;

    this.init();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    this.isPlaying = true;
    this.dispatchEvent(new Event("play"));

    // Master gain envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.08, now + 1.2);
    masterGain.gain.linearRampToValueAtTime(0, now + 3);

    // Low pass filter sweep
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 1.5;
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(120, now + 3);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Drone chord: C2, G2, C3
    const freqs = [65.41, 98.00, 130.81];
    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = freq < 100 ? "sine" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 15;
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 3);
    });

    setTimeout(() => {
      this.isPlaying = false;
      this.dispatchEvent(new Event("stop"));
    }, 3000);
  }
}

export const spatialAudio = typeof window !== "undefined" ? new AmbientSwellGenerator() : null;
