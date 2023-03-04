import { ORM } from "./ORM";

export class DataModel {
  public readonly _field: any | undefined;
  public _orm: ORM | undefined;
  public findAll() {}
  public update() {}
  public save() {}
  public delete() {}
}
