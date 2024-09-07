import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MomentDateModule} from '@angular/material-moment-adapter'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { IdValidatorDirective } from './directives/id-validator.directive';
import { NameValidatorDirective } from './directives/name-validator.directive';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { NrcValidatorDirective } from './directives/nrc-validator.directive';
import { YearpickerDirective } from './directives/yearpicker.directive';
import { DatepickerDirective } from './directives/datepicker.directive';
import { DriverValidatorDirective } from './directives/driver-validator.directive';
import { ConfirmButComponent } from './confirm-but/confirm-but.component';
import { ExcelImportDialogComponent } from './excel-import-dialog/excel-import-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    IdValidatorDirective,
    NameValidatorDirective,
    MobileValidatorDirective,
    NrcValidatorDirective,
    YearpickerDirective,
    DatepickerDirective,
    DriverValidatorDirective,
    ConfirmButComponent,
    ExcelImportDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    MomentDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
