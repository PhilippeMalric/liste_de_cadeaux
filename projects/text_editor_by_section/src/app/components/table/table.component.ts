import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

export interface Item {
  id: String;
  name: string;
  type: string;
  txt: string;
  position: number;
  selected: boolean;
  dirty: boolean;
}

/**
 * @title Table with selection
 */
@Component({
  selector: 'mytable',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html'
})
export class MyTable {
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'price',
    'short_description',
    'images'
  ];

  dataSource: MatTableDataSource<Item>;
  selection = new SelectionModel<Item>(true, []);

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.http
      .get('assets/filter.json')
      .pipe(
        map((items: Item[]) => {
          console.log(items);
          this.dataSource = new MatTableDataSource<Item>(items);
        })
      )
      .subscribe(() => this.changeDetectorRef.markForCheck());

    /*
  this.http.get('assets/dinosaur.json').pipe(
     take(1),
     map((items:Item[])=>{
       console.log(items)
       items = items.filter((item)=>item.price != null && item.images != null)
        items.map((item:Item)=>{
          item.imagesUrl = item.images.split(",").map((s)=>s.match(/https.*jpg/g)).filter((s)=>s).map((extractedString)=>{
            return extractedString.toString()
          })[0]
      })


      console.log(items)
      this.dataSource = new MatTableDataSource<Item>(items);
    }))
*/

    this.selection = new SelectionModel<Item>(true, []);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }
}
