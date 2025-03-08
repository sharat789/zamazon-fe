import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ResponseModel } from '../../../types';

interface Order {
  id: number;
  user_id: number;
  status: string;
  amount: number;
  transaction_id: string;
  order_ref_number: string;
  payment_id: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: number;
  order_id: number;
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
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>('');

  orders$ = this.ordersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next('');

    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.loadingSubject.next(false);
        if (response && response.data) {
          this.ordersSubject.next(response.data);
        } else {
          this.errorSubject.next('No orders found');
          this.ordersSubject.next([]);
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.loadingSubject.next(false);
        this.errorSubject.next('Failed to load orders');
        this.ordersSubject.next([]);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id;
  }
}
