import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';
import { Store } from '@ngrx/store';
import { App_N_Game_State } from '../../gameMeta.state';

import { take } from 'rxjs/operators';

const FORCES = {
  LINKS: 4,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];
  options: { width: any; height: any };

  constructor(
    private store: Store<App_N_Game_State>,
    nodes,
    links,
    options: { width; height }
  ) {}

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.nodes.map((n: Node, i: any) => {
      if (i == 0) {
        n.color2 = 'red';
      } else {
        n.color2 = 'black';
      }
    });

    this.simulation.nodes(this.nodes);
  }

  initNodes2(nodes: Node[]) {
    d3.selectAll('nodeG')
      .exit()
      .remove();

    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    nodes.map((n: Node) => (n.color2 = 'black'));
    this.simulation.nodes(nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force(
      'links',
      d3
        .forceLink(this.links)
        .id(d => d['id'])
        .distance(1)
        .strength(2)
    );
  }

  initLinks2(links: Link[]) {
    d3.selectAll('link')
      .exit()
      .remove();
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    console.log(links);

    this.simulation.force(
      'links',
      d3
        .forceLink(links)
        .id(d => d['id'])
        .distance(1)
        .strength(2)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }
    d3.selectAll('nodeG')
      .exit()
      .remove();
    d3.selectAll('link')
      .exit()
      .remove();
    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation();
      this.simulation
        .force('link', d3.forceLink().distance(50))
        .force(
          'collide',
          d3
            .forceCollide(function(d) {
              return 10;
            })
            .iterations(16)
        )
        .force('charge', d3.forceManyBody().strength(-2000))
        .force('center', d3.forceCenter(options.width / 2, options.height / 2))
        .force('y', d3.forceY(0))
        .force('x', d3.forceX(0));

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function() {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force(
      'centers',
      d3.forceCenter(options.width / 2, options.height / 2)
    );

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
