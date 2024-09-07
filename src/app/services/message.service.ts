import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  openPopup(message: string) {

    this.snackBar.open(message, '', {

      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: ['success-panel']
    })

  }

  openBottomPopup(message: string) {

    this.snackBar.open(message, '', {

      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500,
      panelClass: ['success-panel']
    })

  }


}
