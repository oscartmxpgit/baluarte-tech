import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.css'] // Solución: Corregido a array de strings
})
export class CtaButtonComponent implements OnInit {
  subject: string = 'Solicitud de Diagnóstico Gratuito';
  @Input() variant: 'primary' | 'nav' = 'primary';
  
  private contentService = inject(ContentService);
  
  // Respaldo síncrono inmediato para evitar enlaces vacíos al renderizar
  private defaultEmail = environment.supportEmail || 'hola@baluarte.tech';
  ctaHref: string = `mailto:${this.defaultEmail}?subject=${encodeURIComponent(this.subject)}`;

  getClasses() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-nav-cta': this.variant === 'nav'
    };
  }

  ngOnInit() {
    this.contentService.getContent().subscribe({
      next: (res) => {
        // Sobrescribe el enlace dinámicamente si el servicio remoto responde con éxito
        const email = res?.legal?.email || this.defaultEmail;
        this.ctaHref = `mailto:${email}?subject=${encodeURIComponent(this.subject)}`;
      },
      error: (err) => {
        console.error('Error al recuperar el contenido dinámico del CTA:', err);
        // Mantiene de forma segura el fallback síncrono ya configurado
      }
    });
  }
}
