import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({ selector: 'app-registro', standalone: false, templateUrl: './registro.component.html', styleUrls: ['../auth-shell.styles.scss'] })
export class RegistroComponent {
  error = '';
  form = this.fb.group({ nombre: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.auth.register(this.form.value.nombre || '', this.form.value.email || '', this.form.value.password || '').subscribe({ next: () => this.router.navigate(['/mi-cuenta']), error: error => this.error = error.error?.error || 'No pudimos crear tu cuenta.' });
  }
}
