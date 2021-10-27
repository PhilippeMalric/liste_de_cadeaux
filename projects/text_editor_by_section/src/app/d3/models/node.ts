import * as d3 from 'd3';
import { AppConfig } from '../../configs/app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  num?: string | null;
  img?: string | null;
  label?: string | null;
  box?: any | null;
  color2: any;
  visited?: boolean;
  id: string;
  linkCount: number = 0;

  constructor(id, img, label) {
    this.color2 = 'black';
    this.id = id;
    this.img = img;
    this.label = label;
    this.box = {};
  }

  normal = () => {
    return Math.sqrt(this.linkCount / AppConfig.N);
  };

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return 30 * this.normal() + 10 + 'px';
  }

  get color() {
    let index = Math.floor(AppConfig.SPECTRUM.length * this.normal());
    return AppConfig.SPECTRUM[index];
  }
}
