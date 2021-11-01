import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'anms-associate-email',
  templateUrl: './associate-email.component.html',
  styleUrls: ['./associate-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssociateEmailComponent implements OnInit {
  users$: any;


  
  constructor(private gameService:GameService) { }

  ngOnInit(): void {

    this.users$ = this.gameService.get_user_data().pipe(
      map((data)=>{
        return Object.keys(data).map((key)=>{

          return data[key]

        })
      }),
      tap((data)=>{

        console.log(data)

    })
    )


  }

}
