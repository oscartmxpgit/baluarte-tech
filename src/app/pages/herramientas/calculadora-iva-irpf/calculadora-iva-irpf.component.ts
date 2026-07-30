import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-iva-irpf-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './calculadora-iva-irpf.component.html',
  styleUrls: ['./calculadora-iva-irpf.component.css']
})
export class IvaIrpfCalculatorComponent implements OnInit {
  public amount: number = 1000;
  public amountType: 'base' | 'total' = 'base';
  public ivaRate: number = 21;
  public irpfRate: number = 15;

  public baseAmount: number = 0;
  public ivaAmount: number = 0;
  public irpfAmount: number = 0;
  public totalAmount: number = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de IVA e IRPF Online | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Desglosa fácilmente la base imponible, el IVA y las retenciones de IRPF para tus facturas y presupuestos profesionales.'
    });
    this.calculate();
  }

  public calculate(): void {
    if (!this.amount || this.amount <= 0) {
      this.baseAmount = 0;
      this.ivaAmount = 0;
      this.irpfAmount = 0;
      this.totalAmount = 0;
      return;
    }

    if (this.amountType === 'base') {
      this.baseAmount = this.amount;
      this.ivaAmount = this.baseAmount * (this.ivaRate / 100);
      this.irpfAmount = this.baseAmount * (this.irpfRate / 100);
      this.totalAmount = this.baseAmount + this.ivaAmount - this.irpfAmount;
    } else {
      // Total is known (including IVA)
      this.baseAmount = this.amount / (1 + (this.ivaRate / 100));
      this.ivaAmount = this.amount - this.baseAmount;
      this.irpfAmount = this.baseAmount * (this.irpfRate / 100);
      this.totalAmount = this.amount - this.irpfAmount;
    }
  }
}