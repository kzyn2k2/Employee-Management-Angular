import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[nameValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true}
  ]
})
export class NameValidatorDirective implements Validator {

  constructor() { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const val = control.value

    if (!val) {

      return null;

    }

    const valid = /^[A-Za-z\s]+$/.test(val);

    return valid ? null : {nameValidator: true}

  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
