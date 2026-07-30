import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-commission-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './commission-calculator.component.html',
  styleUrls: ['./commission-calculator.component.css']
})
export class CommissionCalculatorComponent implements OnInit {
  public saleAmount: number = 100;
  public selectedGateway: 'stripe' | 'bizum' | 'tpv' = 'stripe';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de Comisiones de Stripe, Bizum y TPV | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Calcula exactamente cuánto dinero neto recibes por tus ventas según las comisiones de Stripe, Bizum o TPV bancario.'
    });
  }

  public get fee(): number {
    if (!this.saleAmount || this.saleAmount <= 0) return 0;
    switch (this.selectedGateway) {
      case 'stripe':
        return this.saleAmount * 0.015 + 0.25;
      case 'bizum':
        return this.saleAmount * 0.012;
      case 'tpv':
        return this.saleAmount * 0.005 + 0.10;
      default:
        return 0;
    }
  }

  public get netAmount(): number {
    return Math.max(0, this.saleAmount - this.fee);
  }
}