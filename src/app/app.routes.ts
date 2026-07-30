import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

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
    loadComponent: () => import('./pages/legal/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Política de Privacidad | BaluArte'
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./pages/legal/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent),
    title: 'Aviso Legal | BaluArte'
  },
  // Rutas de herramientas colocadas ANTES del comodín
  {
    path: 'herramientas',
    loadComponent: () => import('./pages/herramientas/tools-hub/tools-hub.component').then(m => m.ToolsHubComponent)
  },
  {
    path: 'herramientas/generador-link-whatsapp',
    loadComponent: () => import('./pages/herramientas/whatsapp-generator/whatsapp-generator.component').then(m => m.WhatsappGeneratorComponent)
  },
  {
    path: 'herramientas/calculadora-roi-automatizacion',
    loadComponent: () => import('./pages/herramientas/roi-calculator/roi-calculator.component').then(m => m.RoiCalculatorComponent)
  },
  {
    path: 'herramientas/calculadora-comisiones',
    loadComponent: () => import('./pages/herramientas/commission-calculator/commission-calculator.component').then(m => m.CommissionCalculatorComponent)
  },
  {
    path: 'herramientas/limpiador-datos-excel',
    loadComponent: () => import('./pages/herramientas/data-cleaner/data-cleaner.component').then(m => m.DataCleanerComponent)
  },
  {
    path: 'herramientas/generador-qr-wifi',
    loadComponent: () => import('./pages/herramientas/wifi-qr-generator/wifi-qr-generator.component').then(m => m.WifiQrGeneratorComponent)
  },
  // El comodín de página no encontrada SIEMPRE va al final
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada | Baluarte Tech'
  }
];