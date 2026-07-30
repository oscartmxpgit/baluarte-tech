import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.css']
})
export class CtaButtonComponent {
  subject: string = 'Solicitud de Diagnóstico Gratuito';
  @Input() variant: 'primary' | 'nav' = 'primary';
  
  private contentService = inject(ContentService);
  
  private defaultEmail = environment.supportEmail || 'hola@baluarte.tech';
  private targetEmail: string = this.defaultEmail;

  // Teléfono ofuscado para WhatsApp
  private readonly t = '34';
  private readonly n = '699934588'; // número de WhatsApp Business  https://wa.me/34699934588

  ngOnInit() {
    this.contentService.getContent().subscribe({
      next: (res) => {
        this.targetEmail = res?.legal?.email || this.defaultEmail;
      },
      error: (err) => {
        console.error('Error al recuperar el contenido dinámico del CTA:', err);
      }
    });
  }

  ejecutarAccion(event: Event): void {
    event.preventDefault();
    
    // Si prefieres usar WhatsApp en lugar de correo, construimos el enlace protegido aquí:
    const mensaje = encodeURIComponent(`Hola, me interesa solicitar el diagnóstico gratuito (${this.subject}).`);
    const url = `https://wa.me/${this.t}${this.n}?text=${mensaje}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getClasses() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-nav-cta': this.variant === 'nav'
    };
  }
}