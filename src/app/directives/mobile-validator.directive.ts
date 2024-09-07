import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[mobileValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true}
  ]
})
export class MobileValidatorDirective implements Validator {

  constructor() { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const val = control.value

    if (!val) {

      return null;

    }

    const valid = /^09[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(val);

    return valid ? null : {mobileValidator: true}

  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
