import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from '../../core/auth/google-auth.service';
import { MyErrorStateMatcher } from '../email/email.component';

@Component({
  selector: 'anms-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnregistrementComponent implements OnInit {

  
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);
passwordFormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]);

passwordFormControl2 = new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]);

matcher = new MyErrorStateMatcher();
matcher2 = new MyErrorStateMatcher();
matcher3 = new MyErrorStateMatcher();





  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private googleAuthService: GoogleAuthService) { }
  
  ngOnInit(): void {
  
  }

  onSubmit() {
    //this.loading = true;
    this.googleAuthService.enregistrement(this.emailFormControl.value, this.passwordFormControl.value)
  }
  
  googleSignIn = ()=>{
    this.googleAuthService.googleSignIn()
  }
  

}
