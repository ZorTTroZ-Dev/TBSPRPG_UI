import {AdventureObject} from './adventureObject';

export interface Location {
  id: string;
  name: string;
  initial: boolean;
  final: boolean;
  sourceKey: string;
  adventureId: string;
  enterScriptId: string;
  exitScriptId: string;
  adventureObjects: AdventureObject[];
}
