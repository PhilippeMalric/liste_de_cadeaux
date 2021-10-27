import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'anms-graph-vote',
  templateUrl: './graph-vote.component.html',
  styleUrls: ['./graph-vote.component.scss']
})
export class GraphVoteComponent implements OnInit {

  @Input() greenH : Number
  @Input() yellowH : Number
  @Input() redH : Number


  constructor() {
    

   }

  ngOnInit(): void {

    this.greenH = isNaN(this.greenH.valueOf())?0:this.greenH

    this.yellowH = isNaN(this.yellowH.valueOf())?0:this.yellowH
    this.redH = isNaN(this.redH.valueOf())?0:this.redH

    //console.log(this.greenH)
    //console.log(this.yellowH)
    //console.log(this.redH)
 
  }



/*
 console.log(this.greenH)
    console.log(this.yellowH)
    console.log(this.redH)
    */
}
