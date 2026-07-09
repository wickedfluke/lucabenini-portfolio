import { Component } from '@angular/core';
import { FrameComponent } from '../../shared/frame/frame.component';

type ProjectStatus = 'active' | 'progress' | 'archived';

interface Project {
  index: string;
  title: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  link?: string;
}

interface ProjectCategory {
  title: string;
  meta: string;
  projects: Project[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  categories: ProjectCategory[] = [
    {
      title: 'Web Platforms',
      meta: 'Angular · Express · TypeScript · MongoDB',
      projects: [
        {
          index: 'W-01',
          title: 'Task Manager',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Multi-user platform for managing personal and shared to-do lists.',
        },
        {
          index: 'W-02',
          title: 'Job Board',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Platform for managing users and job offer listings.',
        },
        {
          index: 'W-03',
          title: 'Corporate Events Manager',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Platform for managing users and company events.',
        },
        {
          index: 'W-04',
          title: 'Homebanking Simulator',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Simulated online banking experience with accounts and transfers.',
        },
        {
          index: 'W-05',
          title: 'Bike Rental Simulator',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Simulated bike rental shop with bookings and fleet management.',
        },
        {
          index: 'W-06',
          title: 'Spotify Playlist Aggregator',
          status: 'active',
          statusLabel: 'Operational',
          description: "Uses the Spotify API to merge all of a user's playlists into one, refreshed daily.",
        },
      ],
    },
    {
      title: 'Flutter Apps',
      meta: 'Dart · Flutter · Android Studio',
      projects: [
        {
          index: 'F-01',
          title: 'Apartment Rental App',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Mobile app for browsing and renting apartments.',
        },
        {
          index: 'F-02',
          title: 'Series Tracker',
          status: 'active',
          statusLabel: 'Operational',
          description: 'App for logging watched TV series episodes.',
        },
        {
          index: 'F-03',
          title: 'Biometric Door Access',
          status: 'active',
          statusLabel: 'Operational',
          description: "App to open the company's door via biometric authentication.",
        },
      ],
    },
    {
      title: 'Telegram Userbots',
      meta: 'Python · Telethon library',
      projects: [
        {
          index: 'T-01',
          title: 'Generic Userbot',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'General-purpose Telegram userbot for custom automation on a personal account.',
        },
        {
          index: 'T-02',
          title: 'Scheduled Broadcaster',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Userbot that repeatedly sends scheduled messages at set intervals.',
        },
        {
          index: 'T-03',
          title: 'Shop Bot',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Telegram storefront bot with automatic BTC payment handling.',
        },
        {
          index: 'T-04',
          title: 'Session Logger',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Kept a Telegram account logged in and reachable persistently.',
        },
        {
          index: 'T-05',
          title: 'Username Checker',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Checked whether a given Telegram username was still available.',
        },
        {
          index: 'T-06',
          title: 'Anti-Scam Bot',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Group moderation bot that auto-removed users found on a scam blacklist.',
        },
        {
          index: 'T-07',
          title: 'Scraper Bot',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Harvested members from one group and added them into another.',
        },
        {
          index: 'T-08',
          title: 'Inventory Bot',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Tracked and managed personal warehouse stock.',
        },
        {
          index: 'T-09',
          title: 'Subscription Tracker',
          status: 'archived',
          statusLabel: 'Archived',
          description: "Tracked clients' subscription expiry dates.",
        },
      ],
    },
    {
      title: 'Python Scripts',
      meta: 'Python',
      projects: [
        {
          index: 'S-01',
          title: 'YouTube WAV Downloader',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Downloads audio from YouTube videos as WAV files.',
        },
        {
          index: 'S-02',
          title: 'Automated Mailer',
          status: 'archived',
          statusLabel: 'Archived',
          description: 'Script for sending automated emails.',
        },
        {
          index: 'S-03',
          title: 'Power Outage Checker',
          status: 'archived',
          statusLabel: 'Archived',
          description: "Monitors a phone's charging state to detect and alert on power outages at home.",
        },
      ],
    },
  ];
}
