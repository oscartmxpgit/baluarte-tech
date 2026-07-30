import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-wifi-qr-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './wifi-qr-generator.component.html',
  styleUrls: ['./wifi-qr-generator.component.css']
})
export class WifiQrGeneratorComponent implements OnInit {
  public ssid: string = '';
  public password: string = '';
  public encryption: string = 'WPA';
  public qrImageUrl: string = '';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Generador de QR para Red Wi-Fi Gratis | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Crea un código QR para que tus clientes o invitados se conecten al Wi-Fi de tu negocio o local al instante sin escribir contraseñas.'
    });
  }

  public generateQr(): void {
    if (!this.ssid) return;
    const wifiString = `WIFI:S:${this.ssid};T:${this.encryption};P:${this.password};;`;
    const encodedData = encodeURIComponent(wifiString);
    this.qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}`;
  }
}