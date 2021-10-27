import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { UpvoteService } from '../../services/upvote.service';
import { sum, values } from 'lodash';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'upvote-button',
  templateUrl: './upvote-button.component.html',
  styleUrls: ['./upvote-button.component.scss']
})
export class UpvoteButtonComponent implements OnInit, OnDestroy {
  @Input() userId;
  @Input() itemId;

  voteCount: number = 0;
  userVote: number = 0;

  subscription;
  color_plus: any;
  color_e: string;
  color_moins: string;
  nouveau_text: any;
  sub2: any;
  propsText: unknown;
  sub3: any;
  propCount: number;

  constructor(
    public dialog: MatDialog,
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.sub3 = this.gameService.get_props(this.itemId).subscribe((data:any)=>{

      if(data){

        this.propCount = Object.keys(data).length
      }else{
        this.propCount = 0
      }

      
    })

    this.sub2 = this.gameService.voir_props(this.itemId,this.userId).subscribe((data:any)=>{

      if(data){this.propsText = data.prop}
    })

    this.subscription = this.upvoteService
      .getItemVotes(this.itemId)
      .subscribe(upvotes => {
        //console.log("firebase")
        if (upvotes) {
          this.voteCount = Object.keys(upvotes).length;
        } else {
          this.voteCount = 0;
        }
        if (upvotes && this.userId && this.userId in upvotes) {
          this.userVote = upvotes[this.userId];
          //console.log(this.userVote)
          this.color_plus = this.userVote == 1 ? 'primary' : 'accent';
          this.color_e = this.userVote == 0 ? 'primary' : 'accent';
          this.color_moins = this.userVote == -1 ? 'primary' : 'accent';
          this.changeDetectorRef.markForCheck();
        } else {
          this.color_plus = 'accent';
          this.color_e = 'accent';
          this.color_moins = 'accent';
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }


  openDialog(): void {

    console.log("this.propsText")
    console.log(this.propsText)
    const dialogRef = this.dialog.open(DialogPropositionVote, {
      width: '400px',
      data: { nouveau_text: this.propsText, text: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nouveau_text = result;
      console.log('result');
      console.log(result);
      console.log(this.itemId);
      if (result && result != '') {
        this.upvoteService.updateUserProp(this.itemId, this.userId, result);
      }
    });
  }

  upvote() {
    let vote = 1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  downvote() {
    let vote = -1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  egale() {
    let vote = 0;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }


}

export interface DialogData {
  nouveau_text: string;
  text: string;
}

@Component({
  selector: 'dialog_vote',
  templateUrl: './dialog.html',
  styleUrls: ['./upvote-button.component.scss']
})
export class DialogPropositionVote {
  constructor(
    public dialogRef: MatDialogRef<DialogPropositionVote>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
