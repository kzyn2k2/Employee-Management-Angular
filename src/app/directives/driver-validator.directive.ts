import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[driverValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DriverValidatorDirective, multi: true}
  ]
})
export class DriverValidatorDirective implements Validator {

  constructor() { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const val = control.value

    if (!val) {

      return null;

    }

    const valid = /^[A-Z]\/[0-9][0-9][0-9][0-9][0-9]\/[0-9][0-9]$/.test(val);
    console.log(valid)
    return valid ? null : {driverValidator: true}

  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}

