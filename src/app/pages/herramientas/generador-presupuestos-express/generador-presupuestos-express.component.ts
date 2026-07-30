import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

interface QuoteItem {
  description: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-generador-presupuestos-express',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-presupuestos-express.component.html',
  styleUrls: ['./generador-presupuestos-express.component.css']
})
export class GeneradorPresupuestosExpressComponent implements OnInit {
  public issuerName: string = '';
  public issuerNif: string = '';
  public issuerAddress: string = '';
  public issuerEmail: string = '';
  public issuerPhone: string = '';

  public clientName: string = '';
  public clientNif: string = '';
  public clientAddress: string = '';
  public quoteNumber: string = 'PRES-2026-001';
  public quoteDate: string = new Date().toISOString().split('T')[0];
  public validityDays: number = 30;
  public terms: string = 'Forma de pago: 50% anticipo, 50% a la finalización de los trabajos.';

  public items: QuoteItem[] = [
    { description: 'Suministro e instalación de componentes', quantity: 1, price: 950 }
  ];

  constructor(private printService: PrintService) {}

  ngOnInit(): void {}

  public addItem(): void {
    this.items.push({ description: '', quantity: 1, price: 0 });
  }

  public removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  public calculateSubtotal(): number {
    return this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  }

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Presupuesto ${this.quoteNumber}`);
  }
}