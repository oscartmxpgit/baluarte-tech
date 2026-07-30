import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-generador-qr-resenas-google',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-qr-resenas-google.component.html',
  styleUrls: ['./generador-qr-resenas-google.component.css']
})
export class GeneradorQrResenasGoogleComponent implements OnInit {
  public businessName: string = 'Mi Comercio Local';
  public googleReviewUrl: string = 'https://g.page/r/tu-enlace-de-google-maps';
  public callToAction: string = 'Ayúdanos a mejorar escaneando este código con la cámara de tu móvil.';

  constructor(private printService: PrintService) {}

  ngOnInit(): void {}

  public encodeUrl(url: string): string {
    return encodeURIComponent(url || 'https://google.com');
  }

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Código QR Reseñas - ${this.businessName}`);
  }
}