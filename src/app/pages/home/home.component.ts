import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrameComponent } from '../../shared/frame/frame.component';

interface DestinationCard {
  index: string;
  title: string;
  description: string;
  path: string;
  cta: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FrameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards: DestinationCard[] = [
    {
      index: '02',
      title: 'About Me',
      description: 'Skill proficiency and operational history.',
      path: '/about',
      cta: 'Open Dossier',
    },
    {
      index: '03',
      title: 'Projects',
      description: 'Development projects.',
      path: '/projects',
      cta: 'View Archive',
    },
    {
      index: '04',
      title: 'Socials',
      description: 'Channels for direct contact.',
      path: '/socials',
      cta: 'Open Channels',
    },
    {
      index: '05',
      title: 'Arcade',
      description: 'Discover yourself.',
      path: '/games',
      cta: 'Enter Arcade',
    }
  ];
}
