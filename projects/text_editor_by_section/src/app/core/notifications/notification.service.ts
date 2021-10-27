import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {}

  default(message: string) {
    this.show(message, {
      duration: 3000,
      panelClass: ['default-notification-overlay','center-text']
    });
  }

  info(message: string) {
    this.show(message, {
      duration: 15000,
      panelClass: ['info-notification-overlay','center-text']
    });
  }

  success(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: ['success-notification-overlay','center-text']
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: 4500,
      panelClass: ['warning-notification-overlay','center-text']
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 100,
      panelClass: ['error-notification-overlay','center-text']
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  }
}
