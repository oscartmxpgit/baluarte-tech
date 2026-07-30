import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'BaluArte Tech | Diseño Web y Automatizaciones en Villarrobledo'
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
    loadComponent: () => import('./pages/herramientas/tools-hub/herramientas-hub.component').then(m => m.HerramientasHubComponent),
    title: 'Herramientas Gratuitas para PYMEs y Comercios | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-link-whatsapp',
    loadComponent: () => import('./pages/herramientas/whatsapp-generator/whatsapp-generator.component').then(m => m.WhatsappGeneratorComponent),
    title: 'Generador de Link de WhatsApp | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-roi-automatizacion',
    loadComponent: () => import('./pages/herramientas/roi-calculator/roi-calculator.component').then(m => m.RoiCalculatorComponent),
    title: 'Calculadora de ROI y Ahorro por Automatización | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-comisiones',
    loadComponent: () => import('./pages/herramientas/commission-calculator/commission-calculator.component').then(m => m.CommissionCalculatorComponent),
    title: 'Calculadora de Comisiones de Pago | BaluArte Tech'
  },
  {
    path: 'herramientas/limpiador-datos-excel',
    loadComponent: () => import('./pages/herramientas/data-cleaner/data-cleaner.component').then(m => m.DataCleanerComponent),
    title: 'Limpiador de Datos para Excel | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-qr-wifi',
    loadComponent: () => import('./pages/herramientas/wifi-qr-generator/wifi-qr-generator.component').then(m => m.WifiQrGeneratorComponent),
    title: 'Generador de Código QR para Wi-Fi | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-margen-beneficio',
    loadComponent: () => import('./pages/herramientas/margin-calculator/margin-calculator.component').then(m => m.MarginCalculatorComponent),
    title: 'Calculadora de Margen de Beneficio y Precio de Venta | BaluArte Tech'
  },
  // Nuevas herramientas de facturación, PDF e informes
  {
    path: 'herramientas/generador-facturas-express',
    loadComponent: () => import('./pages/herramientas/generador-facturas-express/generador-facturas-express.component').then(m => m.GeneradorFacturasExpressComponent),
    title: 'Generador de Facturas Express | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-presupuestos-express',
    loadComponent: () => import('./pages/herramientas/generador-presupuestos-express/generador-presupuestos-express.component').then(m => m.GeneradorPresupuestosExpressComponent),
    title: 'Generador de Presupuestos Express | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-albaranes-express',
    loadComponent: () => import('./pages/herramientas/generador-albaranes-express/generador-albaranes-express.component').then(m => m.GeneradorAlbaranesExpressComponent),
    title: 'Generador de Albaranes Express | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-registro-horario',
    loadComponent: () => import('./pages/herramientas/generador-registro-horario/generador-registro-horario.component').then(m => m.GeneradorRegistroHorarioComponent),
    title: 'Generador de Registro Horario Laboral | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-carteles-horarios',
    loadComponent: () => import('./pages/herramientas/generador-carteles-horarios/generador-carteles-horarios.component').then(m => m.GeneradorCartelesHorariosComponent),
    title: 'Generador de Carteles de Horarios y Avisos | BaluArte Tech'
  },
  {
    path: 'herramientas/generador-qr-resenas-google',
    loadComponent: () => import('./pages/herramientas/generador-qr-resenas-google/generador-qr-resenas-google.component').then(m => m.GeneradorQrResenasGoogleComponent),
    title: 'Generador de QR para Reseñas de Google | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-iva-irpf',
    loadComponent: () => import('./pages/herramientas/calculadora-iva-irpf/calculadora-iva-irpf.component').then(m => m.IvaIrpfCalculatorComponent),
    title: 'Calculadora de IVA e IRPF Online | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-punto-equilibrio',
    loadComponent: () => import('./pages/herramientas/calculadora-punto-equilibrio/calculadora-punto-equilibrio.component').then(m => m.CalculadoraPuntoEquilibrioComponent),
    title: 'Calculadora de Punto de Equilibrio (Break-Even) | BaluArte Tech'
  },
  {
    path: 'herramientas/calculadora-tarifa-hora',
    loadComponent: () => import('./pages/herramientas/calculadora-tarifa-hora/calculadora-tarifa-hora.component').then(m => m.CalculadoraTarifaHoraComponent),
    title: 'Calculadora de Tarifa por Hora para Autónomos | BaluArte Tech'
  },
  // El comodín de página no encontrada SIEMPRE va al final
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada | Baluarte Tech'
  }
];