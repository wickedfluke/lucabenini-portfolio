import { Component } from '@angular/core';
import { FrameComponent } from '../../shared/frame/frame.component';

interface SocialChannel {
  index: string;
  platform: string;
  handle: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent {
  channels: SocialChannel[] = [
    {
      index: 'C-01',
      platform: 'GitHub',
      handle: '@wickedfluke',
      description: 'Source code, experiments and open-source contributions.',
      url: 'https://github.com/wickedfluke',
    },
    {
      index: 'C-02',
      platform: 'LinkedIn',
      handle: '/in/luca-benini-13',
      description: 'Professional history.',
      url: 'https://www.linkedin.com/in/luca-benini13/',
    },
    {
      index: 'C-03',
      platform: 'Email',
      handle: 'luca.benini@itsdigitalacademy.com',
      description: 'Direct line for collaboration requests and inquiries.',
      url: 'mailto:luca.benini@itsdigitalacademy.com',
    },
  ];
}
