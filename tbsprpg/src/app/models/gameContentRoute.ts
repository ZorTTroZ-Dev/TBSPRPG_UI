import {Game} from './game';
import {Content} from './content';
import {LocationRoutes} from './locationroutes';

export interface GameContentRoute {
  game: Game;
  contents: Content;
  routes: LocationRoutes;
}
