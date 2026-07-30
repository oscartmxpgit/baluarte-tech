import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaButtonComponent } from '../../cta-button/cta-button.component';

@Component({
  selector: 'app-calculadora-tarifa-hora',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CtaButtonComponent],
  templateUrl: './calculadora-tarifa-hora.component.html',
  styleUrls: ['./calculadora-tarifa-hora.component.css']
})
export class CalculadoraTarifaHoraComponent implements OnInit {
  public desiredNet: number = 1800;
  public monthlyExpenses: number = 400;
  public hoursPerWeek: number = 25;
  public taxBuffer: number = 20;

  public monthlyHours: number = 0;
  public hourlyRate: number = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Calculadora de Tarifa por Hora para Autónomos | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Calcula cuánto cobrar por hora como profesional independiente teniendo en cuenta impuestos, gastos y salario deseado.'
    });
    this.calculate();
  }

  public calculate(): void {
    if (!this.hoursPerWeek || this.hoursPerWeek <= 0) {
      this.monthlyHours = 0;
      this.hourlyRate = 0;
      return;
    }

    this.monthlyHours = Math.round(this.hoursPerWeek * 4.33);
    const grossNeeded = (this.desiredNet + this.monthlyExpenses) / (1 - (this.taxBuffer / 100));
    this.hourlyRate = grossNeeded / this.monthlyHours;
  }
}