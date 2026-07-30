import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-margin-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './margin-calculator.component.html',
  styleUrls: ['./margin-calculator.component.css']
})
export class MarginCalculatorComponent implements OnInit {
  public costPrice: number = 50;
  public marginPercentage: number = 30;
  public marginType: 'sale' | 'cost' = 'sale';

  public salePrice: number = 0;
  public profit: number = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de Margen de Beneficio y Precio de Venta | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Calcula el precio de venta recomendado y tu beneficio bruto según tu margen deseado o el recargo sobre coste para tus productos o servicios.'
    });
    this.calculate();
  }

  public calculate(): void {
    if (!this.costPrice || this.costPrice <= 0 || !this.marginPercentage || this.marginPercentage <= 0) {
      this.salePrice = 0;
      this.profit = 0;
      return;
    }

    if (this.marginType === 'sale') {
      if (this.marginPercentage >= 100) {
        this.salePrice = 0;
        this.profit = 0;
        return;
      }
      this.salePrice = this.costPrice / (1 - (this.marginPercentage / 100));
    } else {
      this.salePrice = this.costPrice * (1 + (this.marginPercentage / 100));
    }

    this.profit = this.salePrice - this.costPrice;
  }
}