import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css',
})
export class TemplateDemo {
  title = 'Template Driven Demo';
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';
  submitted = false;

onSubmit() {
  this.submitted = true;
  alert('Form submitted!');
  // Optionally reset the form fields
  this.username = '';
  this.email = '';
  this.password = '';
  this.role = '';
  this.gender = '';
  this.status = '';
  this.comments = '';
  }
}
