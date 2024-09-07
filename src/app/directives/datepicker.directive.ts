import { Directive } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const FORMAT = {
  parse: {
    dateInput: 'DD/MM/yyyy'
  },
  display: {
    dateInput: 'DD/MM/yyyy',
    monthYearLabel: 'MM/yyyy',
  }
}

@Directive({
  selector: '[datepicker]',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: FORMAT},
  ]
})
export class DatepickerDirective {

  constructor() { }

}
