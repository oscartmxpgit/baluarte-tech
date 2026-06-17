import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Baluarte Tech | Soluciones Digitales y Desarrollo de Software'
  },
  {
    path: 'blog/:slug',
    component: PostComponent
  },
  // Rutas legales con Lazy Loading para optimizar el bundle
  {
    path: 'politica-privacidad',
    loadComponent: () => import('./components/legal/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Política de Privacidad | BaluArte'
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./components/legal/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent),
    title: 'Aviso Legal | BaluArte'
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada | Baluarte Tech'
  }
];