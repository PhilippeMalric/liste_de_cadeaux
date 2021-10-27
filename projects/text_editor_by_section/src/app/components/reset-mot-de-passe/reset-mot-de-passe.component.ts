import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from '../../core/auth/google-auth.service';
import { MyErrorStateMatcher } from '../email/email.component';

@Component({
  selector: 'anms-reset-mot-de-passe',
  templateUrl: './reset-mot-de-passe.component.html',
  styleUrls: ['./reset-mot-de-passe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetMotDePasseComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  matcher = new MyErrorStateMatcher();
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private googleAuthService: GoogleAuthService) { }

  ngOnInit(): void {
 
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.emailFormControl.invalid) {
        return;
    }

    this.loading = true;
    this.googleAuthService.reset_password(this.emailFormControl.value)
}
}
