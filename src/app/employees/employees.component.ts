import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Employee } from '../models/app.model';
import { MessageService } from '../services/message.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent{

  current = 1;
  size = 3;
  total = 0;
  searchText = "";
  searched:boolean = false;
  loading = false;
  employees:any[] = new Array();
  empty = this.checkEmpty.bind(this)
  full = this.checkFull.bind(this)
  dataSource: MatTableDataSource<any>;
  cols = ['empid', 'name', 'fname', 'email', 'mobile', 'nrc', 'gender', 'dob'];

  constructor(private rest: RestService, private message: MessageService) {


  }

  async ngOnInit(): Promise<void> {

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

    if(window.innerWidth < 765) {
      this.cols = ['empid', 'name', 'email'];
    }else if(window.innerWidth >= 765 && window.innerWidth <= 1000) {
      this.cols = ['empid', 'name', 'fname', 'email', 'mobile', 'nrc'];
    }
    await this.getEmployees();
    console.log(this.employees)
  }


  async getEmployees() {

    let pager = {
      "size": this.size,
      "current": this.current,
      "searchVal": this.searchText
    }
    this.loading = true;
    const response: any = await lastValueFrom(this.rest.post('service/employees', pager));
    this.loading = false;
    console.log(response)
    if(response.state){
      this.employees = response.employees;
      this.dataSource = new MatTableDataSource<any>(this.employees);
      this.total = response.total;
    }else{
      console.log(response)

      if(response.message === 'Please use SQL injection safe characters'){
        this.message.openPopup("Please use SQL injection safe characters!");
        this.employees = [{"message": 'Please use SQL injection safe characters!'}]
        this.total = 0;
      }else{
      this.message.openPopup("No employee data found!");
      this.employees = [{"message": "No employee data found!"}]
      this.total = 0;
      }


    }
    if(this.searchText)[
      this.searched = true
    ]
  }

  async cancelSearch() {

    this.searchText = "";
    await this.getEmployees();
    this.searched = false;

  }

  async handleChange(event) {
    this.current = event
    await this.getEmployees()

  }


  @HostListener('window:resize', [])
  onResize(){
    if(window.innerWidth < 765) {
      this.cols = ['empid', 'name', 'email'];
    }
    else if(window.innerWidth >= 765 && window.innerWidth <= 1000) {
      this.cols = ['empid', 'name', 'fname', 'email', 'mobile', 'nrc'];
    }
    else{
      this.cols = ['empid', 'name', 'fname', 'email', 'mobile', 'nrc', 'gender', 'dob'];
    }
  }

  checkEmpty() {

    console.log(this.dataSource.data.length)

    return this.employees.length === 1 && !this.employees[0].syskey;

  }

  checkFull() {


    return !this.checkEmpty();

  }


  clickrow(row) {
    console.log(row)
  }
}
