import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-courosel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courosel.component.html',
  styleUrls: ['./courosel.component.scss']
})
export class CouroselComponent implements OnInit {

  @Input() images: Slide[] = [];
  selectedIndex = 0;

  ngOnInit() {
    // Start auto-slide after 1 second
    interval(2000)
      .subscribe(() => {
        this.autoSlide();
      });
  }

  autoSlide() {
    if (this.selectedIndex < this.images?.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }

  showPrev(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }

  showNext(i: number) {
    if (this.selectedIndex < this.images?.length - 1) {
      this.selectedIndex = i + 1;
    }
  }
}
