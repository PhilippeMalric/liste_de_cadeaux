import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-from-link',
  templateUrl: './from-link.component.html',
  styleUrls: ['./from-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FromLinkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
