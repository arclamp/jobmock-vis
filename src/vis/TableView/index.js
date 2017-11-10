import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

const fields = [
  'title',
  'created',
  'parentId'
];

export default class TableView extends VisComponent {
  constructor (el, options) {
    super(el);
    this.data = options.data;

    select(this.el)
      .selectAll('*')
      .remove();

    this.table = select(this.el)
      .append('table');

    const thead = this.table.append('thead');
    fields.forEach(f => thead.append('th').html(f));

    this.tbody = this.table.append('tbody');
  }

  render () {
    const sel = this.tbody.selectAll('tr')
      .data(this.data);

    const row = sel.enter()
      .append('tr');

    fields.forEach(f => row.append('td').html(d => d[f]));
  }
}
