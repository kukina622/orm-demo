import mysql from "mysql2";
import { DataModel } from "./DataModel";

export class ORM {
  private connection: mysql.Connection;
  constructor(config: mysql.ConnectionOptions) {
    this.connection = mysql.createConnection(config);
  }
  public register(model: DataModel) {}
}
