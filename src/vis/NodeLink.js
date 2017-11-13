import * as d3 from 'd3';
import { d3adaptor } from 'webcola';
import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

import { graphStructure } from '~/util/graph';

export default class NodeLink extends VisComponent {
  constructor (el, options) {
    super(el);

    this.data = options.data;

    this.width = options.width || 960;
    this.height = options.height || 540;

    const graphData = graphStructure(this.data);
    this.node = graphData.node;
    this.link = graphData.link;

    select(this.el)
      .selectAll('*')
      .remove();

    this.svg = select(this.el).append('svg');
  }

  render () {
    const cola = d3adaptor(d3)
      .linkDistance(120)
      .avoidOverlaps(true)
      .size([this.width, this.height]);

    this.svg.attr('width', this.width)
      .attr('height', this.height);

    cola.nodes(this.node)
      .links(this.link)
      .start();

    let link = this.svg.selectAll('.link')
      .data(this.link);
    link = link.enter()
      .append('line')
      .classed('link', true)
      .style('stroke', '#999')
      .style('stroke-width', '3px')
      .style('stroke-opacity', 1)
      .merge(link);

    const rectWidth = 100;
    const rectHeight = 50;

    let node = this.svg.selectAll('.node')
      .data(this.node);
    node = node.enter()
      .append('rect')
      .classed('node', true)
      .style('stroke', 'black')
      .style('stroke-width', '1.5px')
      .style('cursor', 'move')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', 'firebrick')
      .merge(node);

    node.call(cola.drag);

    cola.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('x', d => d.x - rectWidth / 2)
        .attr('y', d => d.y - rectHeight / 2);
    });
  }
}
