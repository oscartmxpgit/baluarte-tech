import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-calculadora-punto-equilibrio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './calculadora-punto-equilibrio.component.html',
  styleUrls: ['./calculadora-punto-equilibrio.component.css']
})
export class CalculadoraPuntoEquilibrioComponent implements OnInit {
  public fixedCosts: number = 2000;
  public salePriceUnit: number = 100;
  public variableCostUnit: number = 30;

  public unitMargin: number = 0;
  public unitsNeeded: number = 0;
  public revenueNeeded: number = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de Punto de Equilibrio (Break-Even) | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Descubre cuántas unidades o qué nivel de ventas necesitas para no incurrir en pérdidas en tu negocio local o PYME.'
    });
    this.calculate();
  }

  public calculate(): void {
    this.unitMargin = this.salePriceUnit - this.variableCostUnit;

    if (this.unitMargin <= 0 || !this.fixedCosts || this.fixedCosts <= 0) {
      this.unitsNeeded = 0;
      this.revenueNeeded = 0;
      return;
    }

    this.unitsNeeded = Math.ceil(this.fixedCosts / this.unitMargin);
    this.revenueNeeded = this.unitsNeeded * this.salePriceUnit;
  }
}