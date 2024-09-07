import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'employees'},
  {path: 'employees', component: EmployeesComponent},
  {path: 'form', component: EmployeeFormComponent},
  {path: 'update/:syskey', component: EmployeeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
