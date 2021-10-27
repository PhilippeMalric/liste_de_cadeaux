import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import * as saveAs from 'file-saver';
import { GoogleSheetService } from '../../services/google-sheet.service';

//declare var saveAs:any;

@Component({
  selector: 'anms-proposition-nav',
  templateUrl: './proposition-nav.component.html',
  styleUrls: ['./proposition-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionNavComponent implements OnInit {
  @Input('data') data: any;
  data2: Observable<any>;
  myItem: any[];
  subAllPrps: any;
  props: unknown;
  mapNom_to_non_delete_prop: {};
  votes: unknown;
  minus: {};
  egale: {};
  plus: {};
  sub1: any;
  subscription1: Subscription;

  constructor(
    private googleSheetService: GoogleSheetService,
    private changeDetectorRef: ChangeDetectorRef,
    public gameService: GameService
  ) {}

  ngOnInit(): void {}
  ngAfterContentInit() {
    console.log('test1678-----------------------------------------------');
    this.subscription1 = this.gameService
      .get_projet_de_loi3()
      .pipe(
        withLatestFrom(this.data),
        map(item => {
          console.log('Allo-----------------------------------------------');
          console.log(item);
          let proposition = item[1];
          let projet_de_loi = item[0];

          document['proposition'] = proposition;
          document['projet_de_loi'] = projet_de_loi;

          let flatP = this.flattenObject(proposition);
          let flatPr = this.flattenObject(projet_de_loi);
          let propArray = this.createArrayPropositions(flatP);

          console.log('Allo2-----------------------------------------------');
          console.log(propArray);
          return propArray;
        })
      )
      .subscribe(data => {
        this.gameService.data2 = data;
        this.changeDetectorRef.markForCheck();
      });
  }

  createArrayPropositions = flatP => {
    console.log(flatP);
    let newArray = [];
    let object1 = {};
    let keys = Object.keys(flatP);
    for (let k of keys) {
      let key_splitted = k.split('.');
      if (key_splitted.length > 2) {
        let key_compo = key_splitted[0] + '_' + key_splitted[1];
        if (key_compo in object1) {
          object1[key_compo][key_splitted[2]] = flatP[k];
        } else {
          object1[key_compo] = {};
          object1[key_compo]['nomItem'] = key_splitted[0];
          //object1[key_compo]["nomUser"] = key_splitted[1]
          object1[key_compo][key_splitted[2]] = flatP[k];
        }
      }
    }
    for (let k of Object.keys(object1)) {
      newArray.push(object1[k]);
    }

    return newArray;
  };

  downloadFile() {
    let data = this.gameService.data2;
    console.log('data123');
    console.log(data);
    data = data.map(dataRow => {
      return { nomItem: dataRow.nomItem, prop: dataRow.prop };
    });
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[1]);
    let csv = data.map(row => {
      return header
        .map(fieldName => {
          let text = JSON.stringify(row[fieldName], replacer);
          //console.log(text)
          text = text ? text : '-';
          return text
            .toString()
            .replace(/"/g, "'")
            .replace(/;/g, ',');
        })
        .join(';');
    });

    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs.saveAs(blob, 'proposition.csv');
  }

  downloadPDL() {
    this.subAllPrps = this.gameService
      .get_props2()
      .pipe(take(1))
      .pipe(withLatestFrom(this.gameService.get_upvote()))
      .subscribe(([props, votes]) => {
        console.log('props');
        console.log(props);
        this.props = props;

        this.mapNom_to_non_delete_prop = {};

        for (let e of Object.keys(props)) {
          this.mapNom_to_non_delete_prop[e] = Object.keys(props[e]).filter(
            key => {
              return !props[e][key].delete;
            }
          ).length;
        }
        console.log('votes');
        console.log(votes);
        this.votes = votes;

        this.minus = {};
        this.egale = {};
        this.plus = {};
        for (let e of Object.keys(votes)) {
          this.minus[e] = Object.keys(votes[e]).filter(key => {
            return votes[e][key] == -1;
          });

          //console.log(e)
          //console.log(this.minus[e])

          this.egale[e] = Object.keys(votes[e]).filter(key => {
            return votes[e][key] == 0;
          });
          this.plus[e] = Object.keys(votes[e]).filter(key => {
            return votes[e][key] == 1;
          });
        }

        /*    this.googleSheetService.getCooker().pipe(take(1)).subscribe((items:any[])=>{
        console.log("items44")
        console.log(items)
        
        for(let e of items){
          //e.props_non_delete = this.mapNom_to_non_delete_prop[e.nomunique]
          //e.props_acc = 0
          e.moins = (this.minus[e.nomunique])?this.minus[e.nomunique].length:0
          e.egale = (this.egale[e.nomunique])?this.egale[e.nomunique].length:0
          e.plus = (this.plus[e.nomunique])?this.plus[e.nomunique].length:0
        }
        
        
        console.log(items)
      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(items[0]);
      let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
      csv.unshift(header.join(';'));
      let csvArray = csv.join('\r\n');
  
      var blob = new Blob([csvArray], {type: 'text/csv' })
      saveAs.saveAs(blob, "item-vote.csv");
      })
   */
      });

    //
  }

  flattenObject = function(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == 'object') {
        var flatObject = this.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }
}
