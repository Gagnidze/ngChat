import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustMatch(controlOneName: string, controlTwoName: string) {
    return(formGroup: FormGroup) => {
      const controlOne = formGroup.controls[controlOneName];
      const controlTwo = formGroup.controls[controlTwoName];

      if(controlTwo.errors && !controlTwo.errors.mustMatch) {
        return
      }

      if( controlOne.value !== controlTwo.value ) {
        controlTwo.setErrors({mustMatch: true})
      } else {
        controlTwo.setErrors(null);
      }
    }
  }