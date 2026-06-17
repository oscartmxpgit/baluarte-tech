import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactLead } from '../../models/contact.model'; // Importamos la interfaz correcta

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private contactService = inject(ContactService);

  // Formulario reactivo
  contactForm = new FormGroup({
    nombre: new FormControl('', { 
      validators: [Validators.required, Validators.minLength(3)], 
      nonNullable: true 
    }),
    email: new FormControl('', { 
      validators: [Validators.required, Validators.email], 
      nonNullable: true 
    }),
    telefono: new FormControl('', { 
      validators: [Validators.minLength(9), Validators.maxLength(15)], 
      nonNullable: true 
    }),
    mensaje: new FormControl('', { 
      validators: [Validators.maxLength(1000)], 
      nonNullable: true 
    }),
    honeypot: new FormControl('', { nonNullable: true }) 
  });

  isSubmitting = false;
  submitError = false;
  isClosed = false;

  onSubmit(): void {
    // 1. Validación de controles
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // 2. Protección contra bots (Honeypot)
    if (this.contactForm.get('honeypot')?.value) {
      console.warn('Bot detectado.');
      this.isClosed = true;
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    // 3. Mapeo limpio al modelo ContactLead
    const formValue = this.contactForm.getRawValue();
    const lead: ContactLead = {
      nombre: formValue.nombre,
      email: formValue.email,
      telefono: formValue.telefono || undefined,
      mensaje: formValue.mensaje || undefined
    };

    // 4. Envío al servicio
    this.contactService.sendLead(lead).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isClosed = true;
      },
      error: (err) => {
        console.error('Error enviando lead:', err);
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }
}