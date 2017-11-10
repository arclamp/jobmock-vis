import { select } from 'd3-selection';

import * as views from './vis';
import jobmock6 from '../data/jobmock6.json';
import jobmock50 from '../data/jobmock50.json';

import content from './index.jade';

select(document.body).html(content());

const div = select('#vis').node();

const vis = new views.TableView(div, {
  data: jobmock6
});
vis.render();
