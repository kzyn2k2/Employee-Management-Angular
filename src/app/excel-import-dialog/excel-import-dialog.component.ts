import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../services/rest.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-excel-import-dialog',
  templateUrl: './excel-import-dialog.component.html',
  styleUrls: ['./excel-import-dialog.component.scss']
})
export class ExcelImportDialogComponent {


  excel: File;
  error: string;

  constructor(private dialogRef: MatDialogRef<ExcelImportDialogComponent>, private rest: RestService){

  }

  async onConfirm() {

    const res:any = await lastValueFrom(this.rest.uploadImage('service/import', this.excel));
    if(res.state){
      this.dialogRef.close(true);
    }else{
      console.log(res)
      this.error = res.message;
    }


  }

  onCancel() {

    this.dialogRef.close(false)

  }

  importHandler(event) {
    const file: File | null = event.target.files.item(0)
    if(file) {
      this.excel = file
    }
  }
}
