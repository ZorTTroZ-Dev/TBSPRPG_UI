export interface Route {
  id: string;
  name: string;
  sourceKey: string;
  successSourceKey: string;
  locationId: string;
  destinationLocationId: string;
  timeStamp: number;
  source: string;
}
