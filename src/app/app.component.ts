import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { KonamiService } from './shared/konami.service';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

  readonly konami = inject(KonamiService);

  private inputBuffer: string[] = [];

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

    this.inputBuffer.push(event.key);
    if (this.inputBuffer.length > KONAMI_CODE.length) this.inputBuffer.shift();

    if (
      this.inputBuffer.length === KONAMI_CODE.length &&
      this.inputBuffer.every((key, i) => key.toLowerCase() === KONAMI_CODE[i].toLowerCase())
    ) {
      this.konami.trigger();
      this.inputBuffer = [];
    }
  }
}
