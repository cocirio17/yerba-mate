import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({ selector: 'app-login', standalone: false, templateUrl: './login.component.html', styleUrls: ['../auth-shell.styles.scss'] })
export class LoginComponent {
  error = '';
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.auth.login(this.form.value.email || '', this.form.value.password || '').subscribe({ next: () => this.router.navigate(['/mi-cuenta']), error: error => this.error = error.error?.error || 'No pudimos iniciar sesión.' });
  }
}
