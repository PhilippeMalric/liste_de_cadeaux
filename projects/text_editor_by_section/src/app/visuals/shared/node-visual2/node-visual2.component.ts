import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual2]',
  template: `
    <svg:g
      class="nodeG"
      [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
    >
      <svg:circle
        class="node"
        cx="0"
        cy="0"
        r="15"
        stroke="black"
        stroke-width="3"
        [attr.fill]="node.color2"
      ></svg:circle>
    </svg:g>
  `,
  styleUrls: ['./node-visual2.component.css']
})
export class NodeVisualComponent2 {
  @Input('nodeVisual2') node: Node;

  constructor() {}
}
