import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ref } from '@firebase/database';
import { Store } from '@ngrx/store';
import { getAuth } from 'firebase/auth';
import { AppState } from 'src/app/store/app.reducer';
import * as matcherDirective from '../../shared/matcher.directive';
import { SignupStart } from '../store/auth.actions';
import { getStorage, uploadBytes, ref } from 'firebase/storage'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  auth = getAuth();
  path: Blob;

  // Is not type inference better here?
  img: string | ArrayBuffer;
  
  storage = getStorage();
  storageRef = ref(this.storage, 'some-child');

  
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
    ) { }
    
    ngOnInit(): void {
    }
    
    signupForm = this.fb.group({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', Validators.required),
      photo: new FormControl(null)
    },{
      validators: matcherDirective.mustMatch('password', 'rePassword')
    })
    
    inputChange(data) {
      // maybe add check for file type
      this.path = data.target.files[0]
      
      console.log(this.path)
      
      
      let reader = new FileReader();
      
      reader.readAsDataURL(this.path)
      
      // So this basically waits for file to load and onload it assigns the result to the variable (read as an image from blob)
      reader.onload = () => {
        this.img = reader.result
        console.log(typeof(this.path))
      }
    }
    
    
    signupSubmit() {
      console.log(this.signupForm);
                
    this.store.dispatch(SignupStart({
      payload: {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        username: this.signupForm.value.username,
        photo: this.path
      }
    }))

    // this.router.navigate(['messenger'])
  }
}

