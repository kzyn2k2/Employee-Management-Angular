import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-but',
  templateUrl: './confirm-but.component.html',
  styleUrls: ['./confirm-but.component.scss']
})
export class ConfirmButComponent {

  title: string = "";
  message: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmButComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.title = data.title;
    this.message = data.message;

  }

  onConfirm() {

    this.dialogRef.close(true);

  }

  onCancel() {

    this.dialogRef.close(false)

  }


}
