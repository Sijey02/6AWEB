import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-form.html',
  styleUrl: './custom-form.css',
})
export class CustomForm {
  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      studentNumber: ['', [Validators.required, Validators.pattern(/^\d{8,12}$/)]],
      role: ['Admin', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['']
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    alert('Form submitted!');
    this.form.reset();
  }
  isInvalid(name: string) {
    const control = this.form.get(name);
    return control?.touched && control?.invalid;
  }
}
