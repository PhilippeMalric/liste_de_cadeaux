import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Node, ForceDirectedGraph } from '../models';
import { D3Service } from '../../services/d3.service';

import { select as d3Select } from 'd3-selection';

@Directive({
  selector: '[arrowDef]'
})
export class ArrowDefDirective implements OnInit {
  constructor(private d3Service: D3Service, private _element: ElementRef) {}

  ngOnInit() {
    let svg;

    svg = d3Select(this._element.nativeElement);

    // les flèches
    (() => {
      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', 'black')
        .style('stroke', 'none');

      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead-reverse')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', 0)
        .attr('orient', 'auto-start-reverse')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', 'black')
        .style('stroke', 'none');
    })();
  }
}
