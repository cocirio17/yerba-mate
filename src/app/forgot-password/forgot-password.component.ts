import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-forgot-password', standalone: false, templateUrl: './forgot-password.component.html', styleUrls: ['../auth-shell.styles.scss'] })
export class ForgotPasswordComponent {
  sent = false;
  error = '';
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.http.post(`${environment.apiUrl}/auth/forgot-password`, this.form.value).subscribe({ next: () => this.sent = true, error: () => this.error = 'No pudimos procesar la solicitud.' });
  }
}
