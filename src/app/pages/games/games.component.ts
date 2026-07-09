import { Component, inject } from '@angular/core';
import { FrameComponent } from '../../shared/frame/frame.component';
import { MatrixTerminalComponent } from './matrix-terminal/matrix-terminal.component';
import { DinoGameComponent } from './dino-game/dino-game.component';
import { KonamiService } from '../../shared/konami.service';

const KONAMI_TARGET = 'uuddlrlrba';

const TOKEN_MAP: Record<string, string> = {
  up: 'u', u: 'u',
  down: 'd', d: 'd',
  left: 'l', l: 'l',
  right: 'r', r: 'r',
  b: 'b',
  a: 'a',
};

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [FrameComponent, MatrixTerminalComponent, DinoGameComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  private readonly konami = inject(KonamiService);

  codeFeedback = '';
  codeAccepted = false;

  checkCode(raw: string): void {
    const normalized = raw
      .trim()
      .toLowerCase()
      .replace(/↑/g, 'up ')
      .replace(/↓/g, 'down ')
      .replace(/←/g, 'left ')
      .replace(/→/g, 'right ')
      .split(/[^a-z]+/)
      .filter(Boolean)
      .map((token) => TOKEN_MAP[token] ?? token)
      .join('');

    this.codeAccepted = normalized === KONAMI_TARGET;
    this.codeFeedback = this.codeAccepted
      ? 'CODE CONFIRMED — sequence confirmed operational.'
      : 'SEQUENCE REJECTED — try again.';

    if (this.codeAccepted) {
      this.konami.trigger();
    }
  }
}
