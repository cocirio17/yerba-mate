import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({ selector: 'app-yerba-contactos', standalone: false, templateUrl: './yerba-contactos.component.html', styleUrls: ['./yerba-contactos.component.scss'] })
export class YerbaContactosComponent {
  sent = false;
  form = this.fb.group({ nombre: ['', Validators.required], email: ['', [Validators.required, Validators.email]], asunto: ['', Validators.required], mensaje: ['', [Validators.required, Validators.minLength(10)]] });
  constructor(private fb: FormBuilder) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.sent = true; this.form.reset(); }
}
