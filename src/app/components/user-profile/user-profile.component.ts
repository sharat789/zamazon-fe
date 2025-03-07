import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  success = false;
  error = '';
  isNewProfile = false; // Flag to determine if this is a new profile

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: this.fb.group({
        address_line1: ['', Validators.required],
        address_line2: [''],
        city: ['', Validators.required],
        post_code: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        country: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        if (response && response.data) {
          // Check if this is a new profile (missing required data)
          this.isNewProfile =
            !response.data.f_name ||
            !response.data.l_name ||
            !response.data.address;

          // Populate form with existing data
          this.profileForm.patchValue({
            first_name: response.data.f_name || '',
            last_name: response.data.l_name || '',
            address: {
              address_line1: response.data.address?.address_line1 || '',
              address_line2: response.data.address?.address_line2 || '',
              city: response.data.address?.city || '',
              post_code: response.data.address?.post_code || '',
              country: response.data.address?.country || '',
            },
          });
        } else {
          this.isNewProfile = true;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loading = false;
        this.error = 'Unable to load profile information';
        this.isNewProfile = true; // If there's an error, assume it's a new profile
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = false;

      // Convert post_code to number if needed
      const profileData = { ...this.profileForm.value };
      if (profileData.address && profileData.address.post_code) {
        profileData.address.post_code = Number(profileData.address.post_code);
      }

      // Choose create or update based on whether it's a new profile
      const profileOperation = this.isNewProfile
        ? this.profileService.createUserProfile(profileData)
        : this.profileService.updateUserProfile(profileData);

      profileOperation.subscribe({
        next: (response) => {
          this.loading = false;
          this.success = true;
          this.isNewProfile = false; // After successful save, it's no longer a new profile

          // Wait for 2 seconds before navigating
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.loading = false;
          this.error = 'Failed to update profile. Please try again.';
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.profileForm);

      // Don't navigate away if the form is invalid
      // this.router.navigate(['/']); - Remove this line
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}
