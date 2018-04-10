export class Meeting {
  private _name: string;
  private _date = new Date();
  private _imagePath: string;
  private _site: string;
  private _gemeente: string;
  private _shortDescription: string;
  private _fullDescription: string;
  private _categories = new Array<string>();

  constructor(name: string, date: Date, gemeente: string, shortDesc: string, fullDesc: string, categ: Array<string>, site?: string, ) {
    this._name = name;
    this._date = date;
    this._gemeente = gemeente;
    this._shortDescription = shortDesc;
    this._fullDescription = fullDesc;
    this._categories = categ;
    this._site = site;

  }

  //stored in DB
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
    return 400 ;
}
}
