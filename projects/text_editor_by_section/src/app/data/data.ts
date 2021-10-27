import { Node } from '../d3/models/node';
import { Link } from '../d3/models/link';

/*
export var myData:{nodes:Node[],links:Link[]} = {
	nodes:[
			new Node ("0",
		"images/baseline_4k_black_48dp.png",
		"Un",
		)
			,
			new Node ("1",
		"images/baseline_hd_black_48dp.png",
		"Deux",
		)
	],
     links:[]
}
myData.links.push({source:0,target:1,arrow:2})
*/

export var myData: { nodes: Node[]; links: Link[] } = {
  nodes: [
    new Node('0', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('1', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('2', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('3', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('4', 'images/baseline_hd_black_48dp.png', 'Deux'),
    new Node('5', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('6', 'images/baseline_hd_black_48dp.png', 'Deux'),
    new Node('7', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('8', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('9', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('10', 'images/baseline_hd_black_48dp.png', 'Deux'),
    new Node('11', 'images/baseline_4k_black_48dp.png', 'Un'),
    new Node('12', 'images/baseline_hd_black_48dp.png', 'Deux')
  ],
  links: []
};
myData.links.push({ source: 0, target: 1, arrow: 2 });
myData.links.push({ source: 1, target: 2, arrow: 2 });
myData.links.push({ source: 2, target: 3, arrow: 2 });
myData.links.push({ source: 3, target: 4, arrow: 2 });
myData.links.push({ source: 4, target: 5, arrow: 2 });
myData.links.push({ source: 5, target: 6, arrow: 2 });
myData.links.push({ source: 6, target: 7, arrow: 2 });
myData.links.push({ source: 7, target: 8, arrow: 2 });
myData.links.push({ source: 8, target: 9, arrow: 2 });
myData.links.push({ source: 9, target: 10, arrow: 2 });
myData.links.push({ source: 10, target: 11, arrow: 2 });
myData.links.push({ source: 11, target: 12, arrow: 2 });
