import { Component, Input, OnInit, inject } from '@angular/core';
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
export class CtaButtonComponent implements OnInit {
  subject: string = 'Solicitud de Diagnóstico Gratuito';
  @Input() variant: 'primary' | 'nav' = 'primary';
  
  private contentService = inject(ContentService);
  ctaHref: string = '';

  getClasses() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-nav-cta': this.variant === 'nav'
    };
  }

  ngOnInit() {
    this.contentService.getContent().subscribe({
      next: (res) => {
        const email = res?.legal?.email || environment.supportEmail || 'hola@baluarte.tech';
        this.ctaHref = `mailto:${email}?subject=${encodeURIComponent(this.subject)}`;
      }
    });
  }
}