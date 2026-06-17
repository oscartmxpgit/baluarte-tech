import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common'; // 1. Importa la directiva

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgClass], // 2. Añádela aquí
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
  @Input() variant: 'navbar' | 'footer' = 'navbar';
}