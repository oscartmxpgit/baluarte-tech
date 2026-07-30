import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roi-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './roi-calculator.component.html',
  styleUrls: ['./roi-calculator.component.css']
})
export class RoiCalculatorComponent implements OnInit {
  public weeklyHoursSpent: number = 10;
  public hourlyRate: number = 20;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de Ahorro por Automatización para PYMEs | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Calcula cuánto dinero y tiempo pierde tu negocio al realizar tareas manuales repetitivas en Excel, facturación o gestión de clientes.'
    });
  }

  public get monthlyHours(): number {
    return Math.round(this.weeklyHoursSpent * 4.33);
  }

  public get yearlyHours(): number {
    return Math.round(this.weeklyHoursSpent * 52);
  }

  public get monthlyCost(): number {
    return this.monthlyHours * this.hourlyRate;
  }

  public get yearlyCost(): number {
    return this.yearlyHours * this.hourlyRate;
  }
}