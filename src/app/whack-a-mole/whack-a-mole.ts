import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
type Cell = {
  isMole: boolean;
  popping: boolean;
  index: number;
};


@Component({
  selector: 'app-whack-a-mole',
  standalone: false,
  templateUrl: './whack-a-mole.html',
  styleUrls: ['./whack-a-mole.css']
})
export class WhackAMole implements OnDestroy {

  rows = 3;
  cols = 3;
  cells: Cell[] = [];

  // Game state
  playing = false;
  timeLeft = 30; // seconds
  score = 0;
  highScore = Number(localStorage.getItem('wam-highscore') || 0);
  lives = 3;
  combo = 0;
  bestCombo = 0;

  // Settings
  difficulty = 2; // 1 easy, 2 normal, 3 hard
  soundsOn = true;

  // Internals
  private tick$?: Subscription;
  private mole$?: Subscription;
  private lastMoleIndex = -1;

  constructor() {
    this.resetGrid();
  }

  ngOnDestroy(): void {
    this.stopLoops();
  }

  // --- Game control ---
  start() {
    if (this.playing) return;
    this.resetGrid();
    this.playing = true;
    this.timeLeft = 30;
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.bestCombo = 0;

    // Game tick (1s)
    this.tick$ = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.gameOver();
    });

    // Mole spawner based on difficulty
    const speed = this.getMoleSpeed();
    this.mole$ = interval(speed).subscribe(() => this.spawnMole());
  }

  pause() {
    if (!this.playing) return;
    this.playing = false;
    this.stopLoops();
  }

  resume() {
    if (this.playing || this.timeLeft <= 0) return;
    this.playing = true;
    this.tick$ = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.gameOver();
    });
    const speed = this.getMoleSpeed();
    this.mole$ = interval(speed).subscribe(() => this.spawnMole());
  }

  restart() {
    this.stopLoops();
    this.playing = false;
    this.start();
  }

  private gameOver() {
    this.playing = false;
    this.stopLoops();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('wam-highscore', String(this.highScore));
    }
  }

  private stopLoops() {
    this.tick$?.unsubscribe();
    this.mole$?.unsubscribe();
  }

  // --- Grid & mole logic ---
  private resetGrid() {
    this.cells = Array.from({ length: this.rows * this.cols }, (_, i) => ({
      isMole: false,
      popping: false,
      index: i,
    }));
    this.lastMoleIndex = -1;
  }

  private getMoleSpeed() {
    switch (this.difficulty) {
      case 1: return 900;
      case 2: return 650;
      case 3: return 450;
      default: return 650;
    }
  }

  private spawnMole() {
    if (!this.playing) return;

    this.cells.forEach(c => (c.isMole = false));

    let idx = Math.floor(Math.random() * this.cells.length);
    if (this.cells.length > 1) {
      while (idx === this.lastMoleIndex) {
        idx = Math.floor(Math.random() * this.cells.length);
      }
    }
    this.lastMoleIndex = idx;

    const cell = this.cells[idx];
    cell.isMole = true;
    cell.popping = true;
    setTimeout(() => (cell.popping = false), 120);

    const lifetime = Math.max(this.getMoleSpeed() - 150, 250);
    setTimeout(() => {
      if (cell.isMole && this.playing) {
        cell.isMole = false;
        this.combo = 0;
        this.lives--;
        this.playSound('miss');
        if (this.lives <= 0) this.gameOver();
      }
    }, lifetime);
  }

  hit(cell: Cell) {
    if (!this.playing || !cell.isMole) return;

    cell.isMole = false;
    this.combo++;
    this.bestCombo = Math.max(this.bestCombo, this.combo);

    const base = 10;
    const bonus = Math.min(this.combo - 1, 5) * 2;
    this.score += base + bonus;

    if (this.combo > 0 && this.combo % 5 === 0) {
      this.timeLeft = Math.min(this.timeLeft + 1, 60);
    }

    this.playSound('hit');
  }

  gridStyle() {
    return {
      'grid-template-columns': `repeat(${this.cols}, 1fr)`,
      'grid-template-rows': `repeat(${this.rows}, 1fr)`,
    };
  }

  canChangeSettings() {
    return !this.playing && this.timeLeft >= 0;
  }

  private playSound(kind: 'hit' | 'miss') {
    if (!this.soundsOn) return;
    try {
      const ctx = new (window as any).AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = kind === 'hit' ? 660 : 220;
      g.gain.value = 0.06;
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 120);
    } catch {
      // ignore if AudioContext unavailable
    }
  }
}