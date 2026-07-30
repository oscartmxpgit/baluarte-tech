import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['../legal.css']
})
export class LegalNoticeComponent implements OnInit {
  private contentService = inject(ContentService);
  
  legalData: any;
  emailHref: string = '';
  emailText: string = '';

  ngOnInit(): void {
    this.contentService.getContent().subscribe({
      next: (res) => {
        this.legalData = res?.legal;
        
        // Prioridad: Email del servicio > Email del entorno > Fallback de seguridad
        const email = this.legalData?.email || environment.supportEmail || 'hola@baluarte.tech';
        
        this.emailHref = `mailto:${email}`;
        this.emailText = email;
      },
      error: (err) => {
        console.error('Error cargando datos legales:', err);
        // Fallback usando el valor de entorno
        const fallbackEmail = environment.supportEmail || 'hola@baluarte.tech';
        this.emailHref = `mailto:${fallbackEmail}`;
        this.emailText = fallbackEmail;
      }
    });
  }
}