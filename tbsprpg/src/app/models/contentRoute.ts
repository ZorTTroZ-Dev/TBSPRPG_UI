import {Content} from './content';
import {LocationRoutes} from './locationroutes';

export interface ContentRoute {
  contents: Content;
  routes: LocationRoutes;
}
