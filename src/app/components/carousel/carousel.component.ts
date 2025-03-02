import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit {
  carouselSlides: any[] = [
    {
      image: 'https://picsum.photos/1200/400', // Valid URL
      title: 'Featured Products',
    },
    {
      image: 'https://picsum.photos/1200/400', // Valid URL
      title: 'New Arrivals',
    },
    {
      image: 'https://picsum.photos/1200/400', // Valid URL
      title: 'Best Sellers',
    },
  ];

  ngAfterViewInit(): void {
    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      const glide = new Glide('.glide', {
        type: 'carousel',
        perView: 1,
        autoplay: 5000,
        hoverpause: true,
      });

      try {
        glide.mount();
      } catch (error) {
        console.error('Error mounting Glide:', error);
      }
    }, 100);
  }
}
