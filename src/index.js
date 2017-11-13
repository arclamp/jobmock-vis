import { select } from 'd3-selection';

import * as views from './vis';
import * as data from './data';

import content from './index.jade';

select(document.body).html(content());

const div = select('#vis').node();
let vis;

const updateVis = () => {
  const whichView = getSelectedOption('select.visualization');
  const whichData = getSelectedOption('select.data');

  const View = views[whichView];
  const dataset = data[whichData];

  vis = new View(div, {
    data: dataset
  });
  vis.render();
};

const makeMenu = (selector, data) => select(selector)
  .on('change', updateVis)
  .selectAll('option')
  .data(data)
  .enter()
  .append('option')
  .attr('value', d => d)
  .text(d => d);

const getSelectedOption = (selector) => {
  const menu = select(selector).node();
  return menu.options[menu.options.selectedIndex].value;
};

makeMenu('select.visualization', Object.keys(views));
makeMenu('select.data', Object.keys(data));

updateVis();
