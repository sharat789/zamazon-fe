import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  // Better sized images for e-commerce banners
  images = [
    'https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200&h=500',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200&h=500',
    'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200&h=500',
  ];

  // Promotional messages that can be customized
  slides = [
    {
      title: 'New Arrivals',
      description: 'Check out our latest products and collections',
      buttonText: 'Shop New Arrivals',
      link: '/products',
    },
    {
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      buttonText: 'View Deals',
      link: '/products',
    },
    {
      title: 'Free Shipping',
      description: 'On all orders over $50',
      buttonText: 'Learn More',
      link: '/products',
    },
  ];

  // Carousel options
  showNavigationArrows = true;
  showNavigationIndicators = true;
  pauseOnHover = true;

  ngOnInit() {
    // Any initialization logic
  }
}
