import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-generador-facturas-express',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-facturas-express.component.html',
  styleUrls: ['./generador-facturas-express.component.css']
})
export class GeneradorFacturasExpressComponent implements OnInit {
  public issuerName: string = '';
  public issuerNif: string = '';
  public issuerAddress: string = '';
  public issuerEmail: string = '';
  public issuerPhone: string = '';

  public clientName: string = '';
  public clientNif: string = '';
  public clientAddress: string = '';
  public invoiceNumber: string = 'FAC-2026-001';
  public invoiceDate: string = new Date().toISOString().split('T')[0];
  public dueDate: string = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
  public paymentMethod: string = 'Transferencia bancaria (30 días)';

  public vatRate: number = 21;
  public irpfRate: number = 0;

  public items: InvoiceItem[] = [
    { description: 'Desarrollo de aplicación web a medida', quantity: 1, price: 1200 }
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

  public calculateVat(): number {
    return (this.calculateSubtotal() * this.vatRate) / 100;
  }

  public calculateIrpf(): number {
    return (this.calculateSubtotal() * this.irpfRate) / 100;
  }

  public calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateVat() - this.calculateIrpf();
  }

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Factura ${this.invoiceNumber}`);
  }
}