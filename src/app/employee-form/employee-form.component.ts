import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { City, Employee, QualificationType } from '../models/app.model';
import { RestService } from '../services/rest.service';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../services/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmButComponent } from '../confirm-but/confirm-but.component';
import { MessageService } from '../services/message.service';



@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  providers: [


  ]
})
export class EmployeeFormComponent {

  form:Employee = new Employee();
  cities: City[] = [];
  image: File;
  uploaded: boolean = false;
  syskey: string;
  dateob: Date;
  preview: string | ArrayBuffer = '';
  date: Date = new Date();
  qualTypes: QualificationType[] = [];
  qualifications = []
  cols = ['qualtype', 'name', 'year', 'plus']


  @ViewChild('empid', {read: NgModel}) empid: NgModel
  @ViewChild('email', {read: NgModel}) email: NgModel
  @ViewChild('mobile', {read: NgModel}) mobile: NgModel
  @ViewChild('nrc', {read: NgModel}) nrc: NgModel
  @ViewChild('drivingLicense', {read: NgModel}) dl: NgModel

  constructor(private rest: RestService, private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router, private message: MessageService) {}

  async ngOnInit() {

    this.rest.exportEvent.subscribe(
      {
        next: val => {
          if(val){
            this.message.openPopup('Export successful!')
          }
        }
      }
    )

    this.rest.importEvent.subscribe(
      {
        next: val => {
          if(val){
            this.message.openPopup('Import successful!')
          }
        }
      }
    )

    await this.getFormSelectData()
    this.route.params.subscribe(
      param => {

        this.syskey = param['syskey'];
        if(this.syskey){
          this.getEmployeeData()
        }

      }
    )

  }

  async getFormSelectData() {

    const selectres: any = await lastValueFrom(this.rest.get('service/formselect'));
    if(selectres.state){
      this.cities = selectres.cities;
      this.qualTypes = selectres.qualTypes;
    }
  }


  async uploadForm(form: NgForm) {
    if(form.valid) {

      if(this.syskey){
        const ref = this.dialog.open(ConfirmButComponent, {data: {"title": "Update", "message": "Do you want to update the employee's information?"}})
        ref.afterClosed().subscribe(
          async diares => {
            if(diares === true){
              await this.updateEmployee();
            }
          }
        )
      }else{
        console.log(this.form)
        const ref = this.dialog.open(ConfirmButComponent, {data: {"title": "Register Employee", "message": "Do you want to register the employee?"}})
          ref.afterClosed().subscribe(
            async diares => {
              if(diares === true){
                  await this.addEmployee();
              }
            }
          )


      }
    }
  }

  addQual() {

    this.qualifications.push({"type": null, "name": '', "year": new FormControl(moment()), "status": 1, "syskey": null});
    console.log(this.qualifications)
  }

  removeQual(index) {

    if(!this.qualifications[index].syskey){
      this.qualifications.splice(index, 1);
    }else{
      this.qualifications[index].status = 4;
    }

  }

  chosenYearHandler(normalizedYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>, i: number) {
    const ctrlValue = this.qualifications[i].year.value;
    ctrlValue.year(normalizedYear.year());
    this.qualifications[i].year.setValue(ctrlValue);
    console.log(ctrlValue.year())
    datepicker.close();
  }

  choseDobHandler(event) {
    this.form.dob = event.value.toJSON()
  }

  convertToQualForm(qual) {

    this.qualifications.push({"name": qual.name, "type": qual.qualType, "syskey": qual.syskey, year: new FormControl(moment(qual.year, 'yyyy')), "status": qual.status})

  }

  addQualToForm(qual: any) {
    console.log(qual.year.value.year())
    this.form.qualifications.push({syskey: qual.syskey, name: qual.name, qualType: qual.type, year: qual.year.value.year(), status: qual.status})
  }

  async addEmployee() {

    for(let q of this.qualifications){
      this.addQualToForm(q);
    }
    console.log(this.date.toJSON());
    const res:any = await lastValueFrom(this.rest.post('service/addemp', this.form));
    console.log(res)
    if(res.state){
      const imageres:any = await lastValueFrom(this.rest.uploadImage('service/image', this.image));
      console.log(imageres);
      if(imageres.state){
        this.message.openPopup("Registered successfully");
        this.router.navigate(['/employees']);
      }
    }else{
      console.log(res)
      if(res.message === 'Duplicate Empid'){
        this.empid.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate Email'){
        this.email.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate Mobile'){
        this.mobile.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate NRC'){
        this.nrc.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate DL'){
        this.dl.control.setErrors({duplicate: true})
      }
      else{
        this.message.openPopup(res.message)
      }
    }
  }

  async updateEmployee() {

    for(let q of this.qualifications){
      this.addQualToForm(q);
    }
    console.log(this.date.toJSON());
    const res:any = await lastValueFrom(this.rest.post('service/update', this.form));
    if(res.state){
      if(this.image){
        const imageres:any = await lastValueFrom(this.rest.uploadImage('service/image', this.image));
      if(imageres.state){
        this.message.openPopup("Updated successfully");
        this.router.navigate(['/employees']);
      }
      }else{
        this.message.openPopup("Updated successfully");
        this.router.navigate(['/employees']);
      }

    }else{
      console.log(res)
      if(res.message === 'Duplicate Empid'){
        this.empid.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate Email'){
        this.email.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate Mobile'){
        this.mobile.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate NRC'){
        this.nrc.control.setErrors({duplicate: true})
      }else if(res.message === 'Duplicate DL'){
        this.dl.control.setErrors({duplicate: true})
      }else{
        this.message.openPopup(res.message)
      }
    }
  }

  async deleteEmployee() {

    const ref = this.dialog.open(ConfirmButComponent, {data: {"title": "Delete Employee Information", "message": "Do you want to delete this employee's information?"}})

    ref.afterClosed().subscribe(

      async state => {

        if(state){
          const res: any = await lastValueFrom(this.rest.del('service/deleteemp', this.form.syskey));
         if(res.state){
          this.message.openPopup("Deleted successfully");
          this.router.navigate(['/employees']);
         }else{
          this.message.openPopup('Something went wrong! Cannot process data deletion.')
         }
        }
      }
    )
  }

  async getEmployeeData() {
    const res:any = await lastValueFrom(this.rest.get('service/employee/'+this.syskey)).catch(
      reason => {
        this.message.openPopup(reason.error.message);
      }
    );
    if(!res.error){
      this.form = res
    this.dateob = new Date(this.form.dob)
    this.uploaded = true
    this.preview = `${environment.url}service/image/${this.form.image}`
    console.log(this.form.qualifications)
    for(let q of this.form.qualifications){
      this.convertToQualForm(q)
    }
    this.form.qualifications = new Array()
    console.log(this.qualifications)
    }

  }

  selectImage(event: any) {
    const file: File | null = event.target.files.item(0)
    if(file){
      this.image = file
      this.form.image = this.image.name
      const reader = new FileReader()
      console.log(this.image)
      reader.onload = (res) => {
        console.log(res.target.result)
        this.preview = res.target.result
        this.uploaded = true
      }
      reader.readAsDataURL(this.image)
    }
  }

  customSelectCity(c1: City, c2: City){
    return c1 && c2 ? c1.autokey === c2.autokey : c1 === c2;
  }

}
