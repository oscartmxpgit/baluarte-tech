import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-process-flow',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './process-flow.component.html',
  styleUrls: ['./process-flow.component.css'],
  host: {
    ngSkipHydration: 'true'
  }
})
export class ProcessFlowComponent {

  steps = [
    {
      title: 'Tu desafío',
      desc: 'Nos cuentas qué tarea o proceso está consumiendo tiempo en tu negocio.'
    },
    {
      title: 'Diagnóstico gratuito',
      desc: 'Analizamos tu flujo y detectamos oportunidades reales de automatización.'
    },
    {
      title: 'Propuesta Baluarte',
      desc: 'Diseñamos una solución clara, escalable y alineada con tus objetivos.'
    },
    {
      title: 'Implementación',
      desc: 'Desarrollamos, desplegamos y te acompañamos hasta que todo funcione.'
    }
  ];

}