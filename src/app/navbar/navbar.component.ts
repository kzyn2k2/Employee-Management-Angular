import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmButComponent } from '../confirm-but/confirm-but.component';
import { environment } from '../services/environment';
import { RestService } from '../services/rest.service';
import { lastValueFrom } from 'rxjs';
import { ExcelImportDialogComponent } from '../excel-import-dialog/excel-import-dialog.component';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  open = false;

  @Output() toggle = new EventEmitter<boolean>();
  @Output() export = new EventEmitter<boolean>();

  toggleNav() {

    this.open = !this.open;
    this.toggle.emit(this.open)

  }

  constructor(private dialog: MatDialog, private rest: RestService, private http: HttpClient, private route: ActivatedRoute) {


  }

  ngOnInit() {

    console.log( this.route.url)


  }

  exportExcel() {
    const ref = this.dialog.open(ConfirmButComponent, {data: {"title": "Export data", "message": "Do you want to export employees' data as XLXS file?"}})
    ref.afterClosed().subscribe(
    async state => {
        if(state){

          const dl = document.createElement('a');
          dl.href = `${environment.url}service/export`;
          dl.click();
          this.rest.exportEvent.next(true);
        }
      }
    )
  }

  importExcel() {

    const dialogRef = this.dialog.open(ExcelImportDialogComponent, {});

    dialogRef.afterClosed().subscribe(
      {
        next: state => {
          if(state){
            this.rest.importEvent.next(true);
          }
        }
      }
    )

  }

}
