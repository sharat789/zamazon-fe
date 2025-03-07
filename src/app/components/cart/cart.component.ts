import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, map, shareReplay } from 'rxjs';
import { CartService } from '../../services/cart.service';
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
  // Replace refreshCart with a direct cartItems subject
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartResponseSubject = new BehaviorSubject<ResponseModel | null>(null);
  private errorSubject = new BehaviorSubject<string>('');

  // Expose observables
  cartItems$ = this.cartItemsSubject.asObservable();
  cart$ = this.cartResponseSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  total$: Observable<number> = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.price * item.qty, 0))
  );

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Initial data load
    this.loadCartData();
  }

  loadCartData(): void {
    this.cartService.fetchCartItems().subscribe({
      next: (response) => {
        this.cartResponseSubject.next(response);
        this.cartItemsSubject.next(response.data || []);
        this.errorSubject.next(
          response.message === 'Error occurred'
            ? 'Failed to load cart items'
            : ''
        );
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

    // Update UI immediately
    this.cartItemsSubject.next(updatedItems);

    // Then send request to backend
    this.cartService.updateCartItem(item.product_id, newQty).subscribe({
      next: () => {
        // No need to refresh data on success as we've already updated the UI
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
        // Revert to original list on error
        this.cartItemsSubject.next(currentItems);
        this.errorSubject.next('Failed to update quantity');
      },
    });
  }

  removeItem(productId: number): void {
    // Optimistically update the UI
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(
      (item) => item.product_id !== productId
    );

    // Update UI immediately
    this.cartItemsSubject.next(updatedItems);

    // Then send request to backend
    this.cartService.removeCartItem(productId).subscribe({
      next: () => {
        // No need to refresh data on success as we've already updated the UI
      },
      error: (err) => {
        console.error('Error removing item:', err);
        // Revert to original list on error
        this.cartItemsSubject.next(currentItems);
        this.errorSubject.next('Failed to remove item');
      },
    });
  }

  placeOrder(): void {
    // Navigate to order page (to be implemented later)
    console.log('Place order clicked');
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}
