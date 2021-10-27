import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Console } from 'console';
import { GameService } from '../../services/game.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'anms-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  subscription1: any;
  valide: boolean;
  userEmail: string;
  constructor(private changeDetectorRef: ChangeDetectorRef,private gameService: GameService) { }

  ngOnInit(): void {

    this.subscription1 = this.gameService.userEmail.subscribe((userEmail)=>{
      this.userEmail = userEmail
      this.emailFormControl.setValue(userEmail)
      
      this.valide = userEmail != ""
      this.changeDetectorRef.markForCheck()
    })

  }
  
  ngOnDestroy = () => {
    this.subscription1.unsubscribe();
  };

  valider = ()=>{
    console.log(this.emailFormControl)
    console.log(this.emailFormControl.value)
    this.gameService.userEmail.next(this.emailFormControl.value)
    

  }

  changer = ()=>{
   
    this.gameService.userEmail.next("")

  }

}
