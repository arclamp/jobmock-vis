import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

import { graphStructure } from '~/util/graph';

export default class NodeLink extends VisComponent {
  constructor (el, options) {
    super(el);

    this.data = options.data;

    const graphData = graphStructure(this.data);
    this.node = graphData.node;
    this.link = graphData.link;

    select(this.el)
      .selectAll('*')
      .remove();

    this.pre = select(this.el).append('pre');
  }

  render () {
    const text = `${JSON.stringify(this.node, null, 2)}\n\n${JSON.stringify(this.link, null, 2)}`;
    this.pre.text(text);
  }
}
