import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  @Input() carouselSlides: any[] = [
    {
      image: 'https://picsum.photos/1200/680', // Valid URL
      title: 'Featured Products',
    },
    {
      image: '/public/179-1200x400.jpg', // Valid URL
      title: 'New Arrivals',
    },
    {
      image: '/public/179-1200x400.jpg', // Valid URL
      title: 'Best Sellers',
    },
  ];

  private glide: Glide | null = null;

  ngAfterViewInit(): void {
    this.initializeGlide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carouselSlides']) {
      this.reinitializeGlide();
    }
  }

  private initializeGlide(): void {
    this.glide = new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      autoplay: 5000,
      hoverpause: true,
    });

    try {
      this.glide.mount();
    } catch (error) {
      console.error('Error mounting Glide:', error);
    }
  }

  private reinitializeGlide(): void {
    if (this.glide) {
      this.glide.destroy();
    }

    setTimeout(() => {
      this.initializeGlide();
    }, 100);
  }
}
