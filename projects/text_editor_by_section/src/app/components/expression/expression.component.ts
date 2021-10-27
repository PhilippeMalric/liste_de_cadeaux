import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Item } from '../table/table.component';

@Component({
  selector: 'anms-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpressionComponent implements OnInit {
  @Input() item: Item;
  value: string;
  constructor() {}

  ngOnInit(): void {
    //console.log(this.item.txt)
  }
}
