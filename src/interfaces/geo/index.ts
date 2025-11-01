export interface IGeolocationCoordinate {
    latitude: number;
    longitude: number;
}

export interface IPathFinder {
    isShow: boolean;
    startCoordinate: IGeolocationCoordinate;
    destinationCoordinate: IGeolocationCoordinate;
}