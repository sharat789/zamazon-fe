import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ResponseModel } from '../../../types';

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  name: string;
  image_url: string;
  seller_id: number;
  price: number;
  qty: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // State management
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private errorSubject = new BehaviorSubject<string>('');
  private isProcessingSubject = new BehaviorSubject<boolean>(false);

  // Expose observables
  cartItems$ = this.cartItemsSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  isProcessing$ = this.isProcessingSubject.asObservable();

  // Calculate total price
  total$: Observable<number> = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.price * item.qty, 0))
  );

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(): void {
    this.cartService.fetchCartItems().subscribe({
      next: (response) => {
        this.cartItemsSubject.next(response.data || []);

        if (response.message === 'Error occurred') {
          this.errorSubject.next('Failed to load cart items');
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        this.errorSubject.next('Failed to load cart items');
      },
    });
  }

  updateQuantity(item: CartItem, newQty: number): void {
    if (newQty <= 0) {
      this.removeItem(item.product_id);
      return;
    }

    // Optimistically update the UI
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map((cartItem) =>
      cartItem.product_id === item.product_id
        ? { ...cartItem, qty: newQty }
        : cartItem
    );

    this.cartItemsSubject.next(updatedItems);

    // Update in the backend
    this.cartService.updateCartItem(item.product_id, newQty).subscribe({
      error: (err) => {
        console.error('Error updating quantity:', err);
        this.cartItemsSubject.next(currentItems); // Revert on error
        this.errorSubject.next('Failed to update quantity');
      },
    });
  }

  removeItem(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next(
      currentItems.filter((item) => item.product_id !== productId)
    );

    this.cartService.removeCartItem(productId).subscribe({
      error: (err) => {
        console.error('Error removing item:', err);
        this.cartItemsSubject.next(currentItems); // Revert on error
        this.errorSubject.next('Failed to remove item');
      },
    });
  }

  checkout(): void {
    if (this.cartItemsSubject.value.length === 0) {
      this.errorSubject.next('Your cart is empty');
      return;
    }

    this.isProcessingSubject.next(true);

    this.orderService.createCheckoutSession().subscribe({
      next: (response) => {
        this.isProcessingSubject.next(false);

        if (response && response.checkout_url) {
          // Direct redirect to Stripe hosted checkout
          window.location.href = response.checkout_url;
        } else {
          this.errorSubject.next('Failed to create checkout session');
        }
      },
      error: (err) => {
        console.error('Error creating checkout session:', err);
        this.isProcessingSubject.next(false);
        this.errorSubject.next('Failed to create checkout session');
      },
    });
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}
