import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  // products: any[] = [];

  // constructor(private productService: ProductService) {}
  products = [
    {
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
      image: 'https://picsum.photos/600/480',
    },
    {
      name: 'Product 2',
      description: 'Description for product 2',
      price: 39.99,
      image: 'https://picsum.photos/600/480',
    },
    // Add more products as needed
  ];

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    // this.productService.getProducts().subscribe((data) => {
    //   this.products = data;
    // });
  }

  addToCart(product: any): void {
    // Add logic to add product to cart
    console.log('Added to cart:', product);
  }
}
