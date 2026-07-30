import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-generador-carteles-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generador-carteles-horarios.component.html',
  styleUrls: ['./generador-carteles-horarios.component.css']
})
export class GeneradorCartelesHorariosComponent implements OnInit {
  public posterTitle: string = 'CERRADO POR VACACIONES';
  public posterEmoji: string = '🏖️';
  public posterMessage: string = 'Estaremos desconectados descansando para volver con más energía.\n\nDisculpen las molestias ocasionadas.';
  public businessName: string = 'Nuestro Establecimiento';
  public extraInfo: string = 'Reabrimos el próximo lunes con horario habitual.';

  constructor(private printService: PrintService) {}

  ngOnInit(): void {}

  public printDocument(section: HTMLElement): void {
    this.printService.printElement(section, `Cartel - ${this.posterTitle}`);
  }
}