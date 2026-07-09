import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  index: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isOpen = false;

  links: NavLink[] = [
    { index: '01', label: 'Home', path: '/' },
    { index: '02', label: 'About Me', path: '/about' },
    { index: '03', label: 'Projects', path: '/projects' },
    { index: '04', label: 'Socials', path: '/socials' },
    { index: '05', label: 'Arcade', path: '/games' },
  ];

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}
