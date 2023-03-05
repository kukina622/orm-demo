import { ORM } from "./ORM";
import { insertParser } from "./parser/insertParser";

function createInstance<T>(
  clazz: new (...args: any[]) => T,
  ...args: any[]
): T {
  return new clazz(...args);
}

export class DataModel {
  public readonly _field: any | undefined;
  private _orm: ORM | undefined;
  private _constructor

  constructor(){
    this._constructor = this.constructor
  }

  public async findAll<T extends DataModel>(): Promise<Array<T>> {
    const table = this._constructor.name;
    const [results] = await this._orm?.query(`SELECT * FROM ${table}`);
    const resultInstance = results.map((x: any) => {
      return createInstance(this._constructor as any, x);
    });    
    return resultInstance
  }
  public update() {}
  public async save() {
    const table = this._constructor.name;
    const statement = insertParser(this._field, table, this);
    await this._orm?.query(statement)
  }
  public delete() {}
}
