import { select } from 'd3-selection';

import { JsonView } from './vis';
import smallData from '../data/jobmock-small.json';

import content from './index.jade';

select(document.body).html(content());

const div = select('#vis').node();

const vis = new JsonView(div, {
  data: smallData
});
vis.render();
