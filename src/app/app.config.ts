import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { errorInterceptor } from './error.interceptor';

// Registramos los datos de idioma de España antes de la configuración de los proveedores
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    
    // Unificación limpia de HttpClient con soporte nativo para Fetch API e interceptores
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor])
    ), 
    
    // Configuración moderna de hidratación con captura de eventos en la carga diferida
    provideClientHydration(withEventReplay()),
    
    // Proveedor global para establecer el Español de España como locale por defecto
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};