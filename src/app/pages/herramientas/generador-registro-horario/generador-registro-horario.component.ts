import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

interface DayRecord {
  dayName: string;
  dateStr: string;
}

@Component({
  selector: 'app-generador-registro-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-registro-horario.component.html',
  styleUrls: ['./generador-registro-horario.component.css']
})
export class GeneradorRegistroHorarioComponent implements OnInit {
  public companyName: string = '';
  public companyCif: string = '';
  public employeeName: string = '';
  public employeeDni: string = '';
  public targetMonth: string = 'Julio 2026';

  public daysInMonth: DayRecord[] = [];

  constructor(private printService: PrintService) {}

  ngOnInit(): void {
    this.generateDays();
  }

  private generateDays(): void {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // Generar 31 días por defecto para el mes de ejemplo
    for (let i = 1; i <= 31; i++) {
      const dateObj = new Date(2026, 6, i); // Julio 2026
      this.daysInMonth.push({
        dayName: days[dateObj.getDay()],
        dateStr: `${i < 10 ? '0' + i : i}/07/2026`
      });
    }
  }

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Registro Horario - ${this.employeeName || 'Empleado'}`);
  }
}