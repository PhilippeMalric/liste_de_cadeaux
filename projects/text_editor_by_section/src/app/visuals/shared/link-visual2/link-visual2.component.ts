import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual2]',
  templateUrl: './link-visual2.html',
  styleUrls: ['./link-visual2.component.css']
})
export class LinkVisual2Component {
  @Input('linkVisual2') link: Link;
}
