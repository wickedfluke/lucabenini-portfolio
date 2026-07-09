import { Component } from '@angular/core';
import { FrameComponent } from '../../shared/frame/frame.component';

interface ProfileField {
  label: string;
  value: string;
}

interface Skill {
  name: string;
  level: number;
}

interface HistoryEntry {
  year: string;
  title: string;
  org: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  profile: ProfileField[] = [
    { label: 'Designation', value: 'Luca Benini' },
    { label: 'Role', value: 'Full-Stack Developer' },
    { label: 'Base of Operations', value: 'Vicenza, Italy' },
    { label: 'Languages', value: 'Italian, English' },
    { label: 'Focus Areas', value: 'Websites, Mobile Apps, Telegram Bots and Userbots' },
  ];

  skills: Skill[] = [
    { name: 'TypeScript / Angular', level: 90 },
    { name: 'TypeScript / Express', level: 90 },
    { name: 'Ruby', level: 85 },
    { name: 'UI & UX', level: 80 },
    { name: 'Dart / Flutter', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'DevOps & CI/CD', level: 70 },
    { name: 'Python', level: 65 },
    { name: 'Docker', level: 60 },
  ];

  history: HistoryEntry[] = [
    {
      year: 'Jan 2026 — Today',
      title: 'Web Developer',
      org: 'HBenchmark',
      description: 'Svelte, Ruby, MongoDB, Docker, Claude, Git',
    },
    {
      year: 'Nov 2024 — Jan 2026',
      title: 'Web Developer',
      org: 'IT Strategy Srl',
      description: 'Typescript, HTML, CSS, Yeoman, Outlook Extension, Sharepoint Spfx',
    },
    {
      year: 'Oct 2023 — Jul 2025',
      title: 'Web Developer Full Stack Course',
      org: 'ITS Digital Academy Mario Volpato | Grade: 110/110 with onors',
      description: 'Full stack development with Express and Angular, DevOps, Design Patterns, Mobile development with Flutter, MongoDB, Python',
    },
  ];
}
