import { Injectable, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from '../d3/models';
import { event as d3Event } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';
import { drag as d3Drag } from 'd3-drag';
import { select as d3Select } from 'd3-selection';
import { selectAll as d3SelectAll } from 'd3-selection';
import { Store, select } from '@ngrx/store';

import { take } from 'rxjs/operators';
import { App_N_Game_State } from '../gameMeta.state';

import { NotificationService } from '../core/core.module';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  public nodes: Node[];
  public links: Link[];
  public sg: ForceDirectedGraph;
  toggle: number;
  subscription_graph: any;
  ref: any;
  constructor(
    private store: Store<App_N_Game_State>,

    private notificationService: NotificationService
  ) {
    window['myService'] = this;
  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3Select(svgElement);

    container = d3Select(containerElement);

    zoomed = () => {
      const transform = d3Event.transform;
      container.attr(
        'transform',
        'translate(' +
          transform.x +
          ',' +
          transform.y +
          ') scale(' +
          transform.k +
          ')'
      );
    };

    zoom = d3Zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3Select(element);

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3Event.sourceEvent.stopPropagation();

      if (!d3Event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3Event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3Event.x;
        node.fy = d3Event.y;
      }

      function ended() {
        if (!d3Event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3Drag().on('start', started));
  }

  initD3Service = (options, ref) => {
    this.ref = ref;
  };

  //Sans les arguments
  initD3Service2 = () => {};
  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  setForceDirectedGraph = (options: { width; height }) => {
    this.sg = new ForceDirectedGraph(
      this.store,
      this.nodes,
      this.links,
      options
    );
    this.sg.ticker.subscribe(d => {
      this.ref.markForCheck();
    });
  };

  changeForceDirectedGraph = (nodes: Node[], links: Link[]) => {
    /*
    this.sg.initNodes2(nodes);
    this.sg.initLinks2(links)
    this.sg.simulation.alpha(1);
    this.sg.simulation.restart()
    */
  };

  getNodes() {
    console.log(this.nodes, this.links);
  }

  addNodes() {}

  infectNode(i: any) {
    this.sg.nodes[i].color2 = 'red';
    this.ref.markForCheck();
  }

  saveNode(i: any) {}
}
