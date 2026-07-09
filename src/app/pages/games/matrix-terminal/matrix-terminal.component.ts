import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

interface LogLine {
  type: 'input' | 'output';
  text: string;
}

@Component({
  selector: 'app-matrix-terminal',
  standalone: true,
  imports: [],
  templateUrl: './matrix-terminal.component.html',
  styleUrl: './matrix-terminal.component.css',
})
export class MatrixTerminalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rainCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('logEl') logRef!: ElementRef<HTMLDivElement>;

  log: LogLine[] = [
    { type: 'output', text: 'SHELL v2.137 — connection established.' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ];

  private ctx!: CanvasRenderingContext2D;
  private columns: number[] = [];
  private intervalId?: ReturnType<typeof setInterval>;
  private resizeHandler?: () => void;
  private hacking = false;
  private readonly fontSize = 15;
  private readonly frameDelay = 90;
  private readonly chars = 'アイウエオカキクケコサシスセソタチツテト0123456789Z*+-<>|::';

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const resize = (): void => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.floor(canvas.width / this.fontSize);
      this.columns = new Array(count).fill(0).map(() => Math.random() * -50);
    };
    resize();
    this.resizeHandler = resize;
    window.addEventListener('resize', resize);

    this.intervalId = setInterval(() => this.animate(), this.frameDelay);
  }

  runCommand(raw: string): void {
    const cmd = raw.trim();
    if (!cmd) return;
    this.log.push({ type: 'input', text: cmd });

    const [name, ...rest] = cmd.toLowerCase().split(' ');
    switch (name) {
      case 'help':
        this.print('COMMANDS: help · whoami · truth · date · clear · exit');
        break;
      case 'whoami':
        this.print('You are a guest process.');
        break;
      case 'truth':
        this.print('Wake up.');
        break;
      case 'date':
        this.print(new Date().toLocaleDateString());
        break;
      case 'clear':
        this.log = [];
        return;
      case 'exit':
        this.print('There is no exit. Only "continue".');
        break;
      default:
        this.print(`Command not recognized: "${name}". Type "help".`);
    }
  }

  private print(text: string): void {
    this.log.push({ type: 'output', text });
    queueMicrotask(() => this.scrollToBottom());
  }

  private scrollToBottom(): void {
    const el = this.logRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  private animate(): void {
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;

    ctx.fillStyle = 'rgba(5, 9, 10, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#2bbfa4';
    ctx.font = `${this.fontSize}px monospace`;

    this.columns.forEach((y, i) => {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)];
      ctx.fillText(char, i * this.fontSize, y * this.fontSize);
      if (y * this.fontSize > canvas.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      } else {
        this.columns[i] = y + 1;
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }
}
