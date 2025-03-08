import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>('');
  private orderIdSubject = new BehaviorSubject<string | null>(null); // Change to string

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  orderId$ = this.orderIdSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.verifyPayment();
  }

  private verifyPayment(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!sessionId) {
      this.loadingSubject.next(false);
      this.errorSubject.next('Invalid session ID');
      return;
    }

    this.orderService.verifyPayment(sessionId).subscribe({
      next: (response) => {
        this.loadingSubject.next(false);

        if (response && response.order_id) {
          // Payment verified successfully
          this.orderIdSubject.next(response.order_id);
          this.clearCart();
        } else {
          // Payment verification failed
          this.errorSubject.next(
            response.message || 'Payment verification failed'
          );
        }
      },
      error: (err) => {
        console.error('Error verifying payment:', err);
        this.loadingSubject.next(false);
        this.errorSubject.next(
          'Failed to verify payment. Please contact support.'
        );
      },
    });
  }

  private clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => console.log('Cart cleared after successful order'),
      error: (err) => console.error('Error clearing cart:', err),
    });
  }

  viewOrders(): void {
    this.router.navigate(['/orders']);
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }
}
