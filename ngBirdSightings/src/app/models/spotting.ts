import { Species } from "./species";

export class Spotting {
    id: number;
    activity: string;
    locationAddress: string;
    notes: string;
    picture: string;
    species:  Species;
    timeDate: string;

    constructor(
      id: number = 0,
      activity: string = '',
      locationAddress: string = '',
      notes: string = '',
      picture: string = '',
      species: Species = new Species(),
      timeDate: string = '',

    ){
      this.id = id;
      this.activity = activity;
      this.locationAddress = locationAddress;
      this.notes = notes;
      this.picture = picture;
      this.species = species;
      this.timeDate = timeDate;
    }


    }


