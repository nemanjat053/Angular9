import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vishwas'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: [],
    confirmPassword: [],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

  submitData() {
    this._registrationService.register(this.registrationForm.value)
          .subscribe(
            response => console.log('Success!', response),
            error => console.log("Error", error)
          )
  }

  loadApiData() {
    this.registrationForm.setValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: 'Postal Code'
      }
    });
  }
}
