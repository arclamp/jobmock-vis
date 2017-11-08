import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

export default class JsonView extends VisComponent {
  constructor (el, options) {
    super(el);

    this.data = options.data;

    select(this.el)
      .selectAll('*')
      .remove();

    this.pre = select(this.el)
      .append('pre');
  }

  render () {
    this.pre.text(JSON.stringify(this.data, null, 2));
  }
}
