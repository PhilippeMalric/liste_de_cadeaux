import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g
      class="nodeG"
      [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
    >
      <svg:circle
        class="node"
        cx="0"
        cy="0"
        r="20"
        stroke="black"
        stroke-width="3"
        fill="red"
      ></svg:circle>
      <svg:image
        class="node"
        [attr.xlink:href]="'assets/' + node.img"
        x="0"
        y="0"
        height="100"
        width="100"
      ></svg:image>
      <svg:text class="node-name" [attr.font-size]="node.fontSize">
        {{ node.id }}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;

  constructor() {}
}
