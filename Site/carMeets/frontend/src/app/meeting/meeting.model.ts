export class Meeting {
  private _id: string; 
  private _name: string;
  private _date = new Date();
  private _imagePath: string;
  private _site: string;
  private _gemeente: string;
  private _postcode: string;
  private _straatnaam: string;
  private _straatnr: string;
  private _shortDescription: string;
  private _fullDescription: string;
  private _categories = new Array<string>();
  private _afbeeldingNaam: string;
  private _idToevoeger: String;
  private _listUsersGoing = new Array<String>();
  private _listUsersLiked = new Array<String>();

  constructor(
    name: string,
    date: Date,
    gemeente: string,
    postcode: string,
    straatnaam: string,
    straatnr: string,
    shortDescription: string,
    fullDescription: string,
    categories: Array<string>,
    afbeeldingNaam: string,
    site?: string,
    idToevoeger?: String,
    listUsersGoing?: Array<String>,
    listUsersLiked?: Array<String>
  ) {
    this._name = name;
    this._date = date;
    this._gemeente = gemeente;
    this._postcode = postcode;
    this._straatnaam = straatnaam;
    this._straatnr = straatnr;
    this._shortDescription = shortDescription;
    this._fullDescription = fullDescription;
    this._categories = categories;
    this._afbeeldingNaam = afbeeldingNaam;
    this._site = site;
    this._idToevoeger = idToevoeger;
    this._listUsersGoing = listUsersGoing;
    this._listUsersLiked = listUsersLiked;
  }

  //stored in DB
  get id(): string {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get date() {
    return this._date;
  }

  public get site() {
    return this._site;
  }

  public get gemeente() {
    return this._gemeente;
  }

  public get postcode() {
    return this._postcode;
  }

  public get straatnaam() {
    return this._straatnaam;
  }

  public get straatnr() {
    return this._straatnr;
  }

  public get shortDescription() {
    return this._shortDescription;
  }

  public get fullDescription() {
    return this._fullDescription;
  }

  public get categories() {
    return this._categories;
  }

  public get idToevoeger() {
    return this._idToevoeger;
  }

  public get listUsersLiked() {
    return this._listUsersLiked;
  }

  public get listUsersGoing() {
    return this._listUsersGoing;
  }

  //logisch berekende dingen
  public get imagePath() {
    return "http://localhost:3000/uploadImages/" + this._afbeeldingNaam;
  }

  public get likeAmount() {
    return this._listUsersLiked.length;
  }

  public get goingAmount() {
    return this._listUsersGoing.length;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      date: this._date,
      gemeente: this._gemeente,
      postcode: this._postcode,
      straatnaam: this._straatnaam,
      straatnr: this._straatnr,
      shortDescription: this._shortDescription,
      fullDescription: this._fullDescription,
      categories: this._categories,
      afbeeldingNaam: this._afbeeldingNaam,
      site: this._site,
      idToevoeger: this._idToevoeger,
      listUsersGoing: this._listUsersGoing, 
      listUsersLiked: this._listUsersLiked
    };
  }

  static fromJSON(json: any): Meeting {
    const rec = new Meeting(json.name, json.date, json.gemeente, json.postcode, json.straatnaam, json.straatnr, json.shortDescription, json.fullDescription, json.categories, json.afbeeldingNaam, json.site, json.idToevoeger, json.listUsersGoing, json.listUsersLiked);
    rec._id = json._id;
    return rec;
  }
}
