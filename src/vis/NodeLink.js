import * as d3 from 'd3';
import { d3adaptor } from 'webcola';
import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

import { graphStructure } from '~/util/graph';

function distance (a, b) {
  const d = {
    x: b.x - a.x,
    y: b.y - a.y
  };
  return Math.sqrt(d.x * d.x + d.y * d.y);
}

function computePath (s, t) {
  const d = distance(s, t);
  const size = 5;
  const v = {
    y: -(t.x - s.x) * size / d,
    x: (t.y - s.y) * size / d
  };

  return `M${t.x} ${t.y} L${s.x + v.x} ${s.y + v.y} L${s.x - v.x} ${s.y - v.y} Z`;
}

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
      .linkDistance(60)
      .avoidOverlaps(true)
      .size([this.width, this.height]);

    this.svg.attr('width', this.width)
      .attr('height', this.height);

    let link = this.svg.selectAll('.link')
      .data(this.link);
    link = link.enter()
      .append('path')
      .classed('link', true)
      .style('stroke', '#999')
      .style('fill', '#999')
      .style('stroke-width', '1px')
      .style('stroke-opacity', 1)
      .merge(link);

    const rectWidth = 50;
    const rectHeight = 25;

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
      .call(cola.drag)
      .merge(node);

    this.node.forEach(n => {
      n.height = rectHeight;
      n.width = rectWidth;
    });

    let label = this.svg.selectAll('.label')
      .data(this.node);
    label = label.enter()
      .append('text')
      .classed('label', true)
      .text(d => d.title)
      .call(cola.drag)
      .merge(label);

    cola.nodes(this.node)
      .links(this.link)
      .start();

    cola.on('tick', () => {
      link.attr('d', d => computePath(d.source, d.target));

      node.attr('x', d => d.x - rectWidth / 2)
        .attr('y', d => d.y - rectHeight / 2);

      label.attr('x', function (d) {
        return d.x - this.getBBox().width / 2;
      })
        .attr('y', function (d) {
          return d.y + this.getBBox().height + rectHeight / 2;
        });
    });
  }
}
