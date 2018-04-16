export class Meeting {
  private _id: string; 
  private _name: string;
  private _date = new Date();
  private _imagePath: string;
  private _site: string;
  private _gemeente: string;
  private _shortDescription: string;
  private _fullDescription: string;
  private _categories = new Array<string>();

  constructor(
    name: string,
    date: Date,
    gemeente: string,
    shortDescription: string,
    fullDescription: string,
    categories: Array<string>,
    site?: string
  ) {
    this._name = name;
    this._date = date;
    this._gemeente = gemeente;
    this._shortDescription = shortDescription;
    this._fullDescription = fullDescription;
    this._categories = categories;
    this._site = site;
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

  public get shortDescription() {
    return this._shortDescription;
  }

  public get fullDescription() {
    return this._fullDescription;
  }

  public get categories() {
    return this._categories;
  }

  //logisch berekende dingen
  public get imagePath() {
    return "images/pic01.jpg";
  }

  public get likeAmount() {
    return 40;
  }

  public get commentAmount() {
    return 400;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      date: this._date,
      gemeente: this._gemeente,
      shortDescription: this._shortDescription,
      fullDescription: this._fullDescription,
      categories: this._categories,
      site: this._site
    };
  }

  static fromJSON(json: any): Meeting {
    const rec = new Meeting(json.name, json.date, json.gemeente, json.shortDescription, json.fullDescription, json.categories, json.site);
    rec._id = json._id;
    return rec;
  }
}
