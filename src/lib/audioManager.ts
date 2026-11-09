'use client';

export interface AudioFrequencyData {
  volume: number; // 0.0 to 1.0
  frequencies: Uint8Array;
  isSilent: boolean;
}

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private dataArray: Uint8Array | null = null;
  private isCapturing: boolean = false;

  public async startCapture(): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        return false;
      }

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64; // Low latency, 32 frequency bins
      this.analyser.smoothingTimeConstant = 0.8;

      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(new ArrayBuffer(bufferLength));
      this.isCapturing = true;
      return true;
    } catch (err) {
      console.warn('Microphone capture not available or permission denied:', err);
      this.isCapturing = false;
      return false;
    }
  }

  public getLiveAudioData(): AudioFrequencyData {
    if (!this.isCapturing || !this.analyser || !this.dataArray) {
      return {
        volume: 0,
        frequencies: new Uint8Array(new ArrayBuffer(32)),
        isSilent: true,
      };
    }

    (this.analyser.getByteFrequencyData as any)(this.dataArray);

    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }

    const average = sum / this.dataArray.length;
    const volume = Math.min(1.0, average / 128); // Normalization to 0-1
    const isSilent = volume < 0.04;

    return {
      volume,
      frequencies: this.dataArray,
      isSilent,
    };
  }

  public stopCapture() {
    this.isCapturing = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  public isActive(): boolean {
    return this.isCapturing;
  }
}
