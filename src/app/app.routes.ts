import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SocialsComponent } from './pages/socials/socials.component';
import { GamesComponent } from './pages/games/games.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Portfolio — Home' },
  { path: 'about', component: AboutComponent, title: 'Portfolio — About Me' },
  { path: 'projects', component: ProjectsComponent, title: 'Portfolio — Projects' },
  { path: 'socials', component: SocialsComponent, title: 'Portfolio — Socials' },
  { path: 'games', component: GamesComponent, title: 'Portfolio — Arcade' },
  { path: '**', redirectTo: '' },
];
