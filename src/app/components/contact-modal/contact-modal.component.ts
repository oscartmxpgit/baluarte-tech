import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core'; // <-- Asegúrate de importar HostListener
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactComponent],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {
  @Input() isOpen = false;
  @Output() closeComponent = new EventEmitter<void>();

  cerrar() {
    this.closeComponent.emit();
  }

  // Escucha el evento 'keydown.escape' en toda la ventana del navegador
  @HostListener('window:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    // Si el modal está abierto, emitimos el evento de cierre al pulsar Escape
    if (this.isOpen) {
      this.cerrar();
    }
  }
}