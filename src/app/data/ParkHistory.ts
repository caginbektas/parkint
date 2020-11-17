import { Address } from './Address';

export class ParkHistory{
    id: number;
    lat: number;
    lng: number;
    address: Address;
    note: string;
    dateTime: string;
}