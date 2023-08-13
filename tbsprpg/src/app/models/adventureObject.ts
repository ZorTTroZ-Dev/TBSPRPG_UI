import {Location} from './location';

export interface AdventureObject {
  id: string;
  name: string;
  description: string;
  adventureId: string;
  type: string;
  locations: Location[];
}

export const GENERIC_ADVENTURE_OBJECT_TYPE = 'generic';

export const ADVENTURE_OBJECT_TYPES: string[] = [GENERIC_ADVENTURE_OBJECT_TYPE];
