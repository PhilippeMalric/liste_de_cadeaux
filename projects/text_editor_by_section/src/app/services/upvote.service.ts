import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, tap } from 'rxjs/operators';
import { GameService } from './game.service';

@Injectable()
export class UpvoteService {
  constructor(
    private gameService: GameService,
    private db: AngularFireDatabase
  ) {}

  getItemVotes(itemId): any {
    // Gets total votes
    //console.log(itemId);
    return this.db
      .object(`upvotes/${itemId}`)
      .valueChanges()
      .pipe(
        tap(item => {
          //console.log('vote');
          //console.log(item);
        })
      );
  }

  updateUserProp = (itemId, userId, prop) => {
    this.gameService.userEmail.pipe(take(1)).subscribe((userEmail)=>{
      console.log('UpdateProp');
      let data = {};
      data[userId] = {delete: false, approuve: false, prop: prop, email:userEmail };
      this.db.object(`propositions/${itemId}/`).update(data);

    })
    
  };

  updateUserVote(itemId, userId, vote): void {
    // Creates or updates user's vote
    console.log('update');
    let data = {};
    data[userId] = vote;

    this.db
      .object(`upvotes/`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        console.log('-----------Add item  -----------');
        //console.log(item);
        //console.log(itemId in item);
        if (itemId in item) {
          this.db.object(`upvotes/${itemId}/`).update(data);
        } else {
          let data1 = {};
          data1[itemId] = data;

          this.db.object(`upvotes/`).update(data1);
        }
      });
  }
}
