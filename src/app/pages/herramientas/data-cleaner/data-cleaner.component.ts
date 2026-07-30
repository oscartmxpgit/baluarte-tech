import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-data-cleaner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './data-cleaner.component.html',
  styleUrls: ['./data-cleaner.component.css']
})
export class DataCleanerComponent implements OnInit {
  public inputData: string = '';
  public outputData: string = '';
  
  // Opciones de limpieza
  public removeSpaces: boolean = true;
  public removeDuplicates: boolean = false;
  public removeEmptyLines: boolean = true;
  public caseTransform: 'none' | 'upper' | 'lower' | 'capitalize' = 'none';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Limpiador y Formateador de Datos de Excel | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Limpia espacios duplicados, elimina líneas vacías y formatea listas de datos copiadas desde Excel o archivos CSV de forma rápida.'
    });
  }

  public cleanData(): void {
    if (!this.inputData) {
      this.outputData = '';
      return;
    }

    let lines = this.inputData.split(/\r?\n/);

    if (this.removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }

    lines = lines.map(line => {
      let processed = line;
      if (this.removeSpaces) {
        processed = processed.replace(/\s+/g, ' ').trim();
      } else {
        processed = processed.trim();
      }

      if (this.caseTransform === 'upper') {
        processed = processed.toUpperCase();
      } else if (this.caseTransform === 'lower') {
        processed = processed.toLowerCase();
      } else if (this.caseTransform === 'capitalize') {
        processed = processed.charAt(0).toUpperCase() + processed.slice(1).toLowerCase();
      }

      return processed;
    });

    if (this.removeDuplicates) {
      lines = Array.from(new Set(lines));
    }

    this.outputData = lines.join('\n');
  }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.outputData).then(() => {
      alert('¡Datos limpios copiadados al portapapeles!');
    });
  }
}