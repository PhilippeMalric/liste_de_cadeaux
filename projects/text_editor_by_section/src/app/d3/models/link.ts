import { Node } from './';
import * as d3 from 'd3';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: any;
  target: any;
  arrow: number | null;

  constructor(source, target, arrow) {
    this.source = source;
    this.target = target;
    this.arrow = arrow;
  }
}
