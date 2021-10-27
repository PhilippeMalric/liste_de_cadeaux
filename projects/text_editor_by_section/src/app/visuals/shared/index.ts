export * from './node-visual/node-visual.component';
export * from './node-visual2/node-visual2.component';
export * from './link-visual/link-visual.component';
export * from './link-visual2/link-visual2.component';

import { NodeVisualComponent } from './node-visual/node-visual.component';
import { NodeVisualComponent2 } from './node-visual2/node-visual2.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import { LinkVisual2Component } from './link-visual2/link-visual2.component';

export const SHARED_VISUALS = [
  NodeVisualComponent,
  NodeVisualComponent2,
  LinkVisualComponent,
  LinkVisual2Component
];
