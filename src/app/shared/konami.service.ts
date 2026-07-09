import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KonamiService {
  readonly active = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;

  trigger(): void {
    this.active.set(true);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.active.set(false), 2600);
  }
}
