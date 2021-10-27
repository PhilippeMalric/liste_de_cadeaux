import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { GoogleAuthService } from '../../core/auth/google-auth.service';
import { selectIsAuthenticated } from '../../core/core.module';

@Component({
  selector: 'anms-explications',
  templateUrl: './explications.component.html',
  styleUrls: ['./explications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplicationsComponent implements OnInit {
  large: boolean;
  isAuthenticated$: any;

  constructor(private ref: ChangeDetectorRef,
    private observableMedia: MediaObserver,
    private store: Store,
    private googleAuthService: GoogleAuthService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
  ngAfterContentInit() {

    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      
      console.log(change[0].mqAlias)
      if(change[0].mqAlias == "sm"|| change[0].mqAlias == "xs"){
        this.large = false;
      }else{
        this.large = true;
      }
  
      this.ref.markForCheck();
      });
    }

    authGoogle = ()=>{

      this.googleAuthService.googleSignIn()

    }

}
