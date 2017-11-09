import { JsonView } from './vis';
import smallData from '../data/jobmock-small.json';

const vis = new JsonView(document.body, {
  data: smallData
});
vis.render();
