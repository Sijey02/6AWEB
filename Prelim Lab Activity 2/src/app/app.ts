import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Skills } from "./skills/skills";
import { Footer } from "./footer/footer";
import { Proficiencies } from "./proficiencies/proficiencies";
import { EducationalBackground } from "./educational-background/educational-background";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Skills, Footer, Proficiencies, EducationalBackground],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-first-app');
}
