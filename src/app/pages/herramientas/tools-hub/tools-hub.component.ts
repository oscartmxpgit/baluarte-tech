import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-tools-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, CtaButtonComponent],
  templateUrl: './tools-hub.component.html',
  styleUrls: ['./tools-hub.component.css']
})
export class ToolsHubComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Herramientas Gratuitas para PYMEs y Autónomos | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Colección de utilidades gratuitas para pequeñas empresas y comercios locales: generador de WhatsApp, calculadora de comisiones, ROI y formateador de Excel.'
    });
  }
}