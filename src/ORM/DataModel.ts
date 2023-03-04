import { ORM } from "./ORM";

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
  public save() {}
  public delete() {}
}
