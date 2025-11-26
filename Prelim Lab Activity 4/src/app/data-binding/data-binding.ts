import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  studentName = "Christian Miranda";
  score = 100;

  imageUrl = "https://picsum.photos/200";
  isDisabled = true;

  colSpanValue = 3;

  isPassing = true;

  boxColor = "purple";
  boxSize = "150px";

}
