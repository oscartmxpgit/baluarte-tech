import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private contentService = inject(ContentService);
  data: any;

  ngOnInit(): void {
    this.contentService.getContent().subscribe({
      next: (res) => {
        this.data = res?.portfolio;
      },
      error: (err) => {
        console.error('Error cargando el portafolio:', err);
      }
    });
  }

  /**
   * Maneja de forma segura el fallo de carga de una imagen en modo estricto.
   * Si la imagen local no se encuentra en assets, se oculta del DOM
   * y la tarjeta muestra el fondo degradado corporativo por defecto.
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.style.display = 'none';
    }
  }
}