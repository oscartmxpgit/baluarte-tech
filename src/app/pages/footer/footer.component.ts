import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { ContentService } from '../../services/content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  private contentService = inject(ContentService);

  legalData: any;
  // Usamos el environment como única fuente de verdad inicial
  email: string = environment.supportEmail;

  ngOnInit(): void {
    this.contentService.getContent().subscribe({
      next: (res) => {
        this.legalData = res?.legal;
        // Si el servicio trae un email, lo usamos; si no, mantenemos el del environment
        if (this.legalData?.email) {
          this.email = this.legalData.email;
        }
      },
      error: (err) => {
        console.error('Error cargando datos legales:', err);
        // Mantenemos el valor del environment en caso de error
        this.email = environment.supportEmail;
      }
    });
  }
}