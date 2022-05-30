export interface Route {
  id: string;
  name: string;
  sourceKey: string;
  routeTakenSourceKey: string;
  locationId: string;
  destinationLocationId: string;
  timeStamp: number;
  source: string;
  routeTakenScriptId: string;
}
