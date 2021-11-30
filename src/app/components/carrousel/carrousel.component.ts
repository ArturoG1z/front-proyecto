import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  data = [
      { img: "assets/images/carousel/1.jpg", title: "Slide 1" },
      { img: "assets/images/carousel/2.png", title: "Slide 2" },
      { img: "assets/images/carousel/3.png", title: "Slide 3" }
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
