import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GoogleSheetService } from '../../services/google-sheet.service';

@Component({
  selector: 'anms-google-sheet',
  templateUrl: './google-sheet.component.html',
  styleUrls: ['./google-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSheetComponent implements OnInit {
  productData: any;
  productDataFilter: any;

  constructor(private csv : GoogleSheetService) { }

  ngOnInit(): void {

    this.csv.getCooker().subscribe(res => {
      this.productData = res
      this.productDataFilter = res
      console.log(this.productData)
    })

  }

}
