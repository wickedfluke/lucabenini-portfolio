import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

const STORAGE_KEY = 'l13-runner-highscore';

interface Obstacle {
  x: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-dino-game',
  standalone: true,
  imports: [],
  templateUrl: './dino-game.component.html',
  styleUrl: './dino-game.component.css',
})
export class DinoGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  state: 'idle' | 'playing' | 'over' = 'idle';
  score = 0;
  highScore = 0;

  private ctx!: CanvasRenderingContext2D;
  private frameId = 0;
  private groundY = 140;
  private unitY = 140;
  private velocityY = 0;
  private readonly gravity = 0.9;
  private readonly jumpForce = -13;
  private obstacles: Obstacle[] = [];
  private speed = 6;
  private spawnTimer = 0;
  private ticks = 0;

  ngAfterViewInit(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.highScore = stored ? Number(stored) : 0;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    this.groundY = canvas.height - 30;
    this.unitY = this.groundY;
    this.draw();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      event.preventDefault();
      this.handleAction();
    }
  }

  handleAction(): void {
    if (this.state === 'playing') {
      this.jump();
    } else {
      this.start();
    }
  }

  private start(): void {
    this.state = 'playing';
    this.ticks = 0;
    this.score = 0;
    this.obstacles = [];
    this.speed = 6;
    this.spawnTimer = 40;
    this.unitY = this.groundY;
    this.velocityY = 0;
    this.frameId = requestAnimationFrame(() => this.loop());
  }

  private jump(): void {
    if (this.unitY >= this.groundY) {
      this.velocityY = this.jumpForce;
    }
  }

  private loop(): void {
    if (this.state !== 'playing') return;
    const canvas = this.canvasRef.nativeElement;

    this.velocityY += this.gravity;
    this.unitY += this.velocityY;
    if (this.unitY > this.groundY) {
      this.unitY = this.groundY;
      this.velocityY = 0;
    }

    this.spawnTimer -= 1;
    if (this.spawnTimer <= 0) {
      const height = 20 + Math.random() * 20;
      this.obstacles.push({ x: canvas.width, width: 14 + Math.random() * 10, height });
      this.spawnTimer = Math.max(35, 75 - this.speed * 4 + Math.random() * 30);
    }

    this.obstacles.forEach((o) => (o.x -= this.speed));
    this.obstacles = this.obstacles.filter((o) => o.x + o.width > 0);

    const unitBox = { x: 40, y: this.unitY - 24, width: 24, height: 24 };
    for (const o of this.obstacles) {
      const oBox = { x: o.x, y: this.groundY - o.height + 6, width: o.width, height: o.height };
      if (
        unitBox.x < oBox.x + oBox.width &&
        unitBox.x + unitBox.width > oBox.x &&
        unitBox.y < oBox.y + oBox.height &&
        unitBox.y + unitBox.height > oBox.y
      ) {
        this.gameOver();
        return;
      }
    }

    this.ticks += 1;
    this.score = Math.floor(this.ticks / 10);
    this.speed = 6 + Math.floor(this.score / 150) * 0.5;

    this.draw();
    this.frameId = requestAnimationFrame(() => this.loop());
  }

  private gameOver(): void {
    this.state = 'over';
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem(STORAGE_KEY, String(this.highScore));
    }
    this.draw();
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.fillStyle = '#05090a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(220, 241, 236, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, this.groundY + 6);
    ctx.lineTo(canvas.width, this.groundY + 6);
    ctx.stroke();

    ctx.fillStyle = '#5ee8cd';
    ctx.fillRect(40, this.unitY - 24, 24, 24);

    ctx.fillStyle = '#c96f9e';
    this.obstacles.forEach((o) => {
      ctx.fillRect(o.x, this.groundY - o.height + 6, o.width, o.height);
    });

    ctx.fillStyle = '#dcf1ec';
    ctx.font = '13px "Share Tech Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`HI ${String(this.highScore).padStart(5, '0')}   ${String(this.score).padStart(5, '0')}`, canvas.width - 12, 22);
    ctx.textAlign = 'left';
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
  }
}
