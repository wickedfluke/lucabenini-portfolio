import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.css'
})
export class FrameComponent {
  @Input() label = '';
  @Input() index = '';
}
