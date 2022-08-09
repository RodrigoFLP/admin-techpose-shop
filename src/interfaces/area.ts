export interface Coordinate {
  id: number;
  lat: number;
  lon: number;
}

export interface Area {
  id: number;
  isActive: boolean;
  coordinates: Coordinate[];
}

export interface newArea {
  inclusive: boolean;
  coordinates: number[][];
}

export interface AreaMutation {
  coordinates: Omit<Coordinate, "id">[];
}
