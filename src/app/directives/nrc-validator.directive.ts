import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[nrcValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: NrcValidatorDirective, multi: true}
  ]
})
export class NrcValidatorDirective implements Validator {

  constructor() { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const val = control.value

    if (!val) {

      return null;

    }

    const valid = /^\d{1,2}\/[A-Z][A-Z][A-Z]\([A-Z]\)[0-9][0-9][0-9][0-9][0-9][0-9]$/.test(val);
    console.log(valid)
    return valid ? null : {nrcValidator: true}

  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
