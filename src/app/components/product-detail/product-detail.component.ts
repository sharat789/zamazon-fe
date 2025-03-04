import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../types';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<ResponseModel>;
  quantity: number = 1;
  productid: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productid = +productId; // Set the productid property
        this.fetchProduct(productId);
      }
    });
  }

  fetchProduct(id: string): void {
    this.product$ = this.productService.fetchProduct(id);
  }

  increaseQuantity(): void {
    this.quantity++;
    console.log(this.productid);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(productId: number, quantity: number): void {
    console.log('Added to cart:', this.productid, 'Quantity:', this.quantity);
    this.productService.addToCart(this.productid, quantity).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
