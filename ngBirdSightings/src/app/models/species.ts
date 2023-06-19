export class Species {
id: number;
description: string;
idInfo: string;
picture: string;
scientificName: string;
type: string;

constructor(
  id: number = 0,
  description: string = '',
  idInfo: string = '',
  picture: string = '',
  scientificName: string = '',
  type: string = '',

) {
  this.id = id
  this.description = description;
  this.idInfo = idInfo;
  this.picture = picture;
  this.scientificName = scientificName;
  this.type = type;
}

}
