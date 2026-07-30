import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-whatsapp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './whatsapp-generator.component.html',
  styleUrls: ['./whatsapp-generator.component.css']
})
export class WhatsappGeneratorComponent implements OnInit {
  public phoneNumber: string = '';
  public customMessage: string = '';
  public generatedLink: string = '';
  public copied: boolean = false;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Generador de Link de WhatsApp Gratis para Negocios | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Crea enlaces directos de WhatsApp para tu comercio o negocio local. Sin registros, 100% gratuito e ideal para compartir en Instagram y redes social.'
    });
  }

  public generateLink(): void {
    if (!this.phoneNumber) return;
    const cleanPhone = this.phoneNumber.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(this.customMessage);
    this.generatedLink = `https://wa.me/${cleanPhone}${encodedMsg ? '?text=' + encodedMsg : ''}`;
    this.copied = false;
  }

  public copyToClipboard(): void {
    if (!this.generatedLink) return;
    navigator.clipboard.writeText(this.generatedLink);
    this.copied = true;
    setTimeout(() => (this.copied = false), 3000);
  }
}