import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

interface DeliveryItem {
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-generador-albaranes-express',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-albaranes-express.component.html',
  styleUrls: ['./generador-albaranes-express.component.css']
})
export class GeneradorAlbaranesExpressComponent implements OnInit {
  public issuerName: string = '';
  public issuerNif: string = '';
  public issuerAddress: string = '';

  public clientName: string = '';
  public deliveryAddress: string = '';
  public deliveryNumber: string = 'ALB-2026-001';
  public deliveryDate: string = new Date().toISOString().split('T')[0];
  public carrier: string = 'Transporte propio';
  public packagesCount: number = 1;

  public items: DeliveryItem[] = [
    { description: 'Caja de material técnico personalizado', quantity: 1 }
  ];

  constructor(private printService: PrintService) {}

  ngOnInit(): void {}

  public addItem(): void {
    this.items.push({ description: '', quantity: 1 });
  }

  public removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Albarán ${this.deliveryNumber}`);
  }
}