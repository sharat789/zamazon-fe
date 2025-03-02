import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, NavbarComponent, ProductListComponent],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products = [
    {
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 2',
      description: 'Description for product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
    },
    // Add more products as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
