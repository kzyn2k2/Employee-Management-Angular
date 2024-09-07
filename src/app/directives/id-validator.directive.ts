import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[idValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: IdValidatorDirective, multi: true}
  ]
})
export class IdValidatorDirective implements Validator {

  constructor() { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const val = control.value

    if (!val) {

      return null;

    }

    const valid = /^[0-9][0-9][0-9][0-9][0-9][1-9]$/.test(val);

    return valid ? null : {idValidator: true}

  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
