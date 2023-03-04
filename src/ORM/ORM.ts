import mysql from "mysql2";
import { DataModel } from "./DataModel";
import { createTableParser } from "./parser";

export class ORM {
  private connection: mysql.Connection;
  constructor(config: mysql.ConnectionOptions) {
    this.connection = mysql.createConnection(config);
  }
  public register(dataModelRef: typeof DataModel) {
    this.inject(dataModelRef);

    const statement = createTableParser(dataModelRef);
    console.log("[ORM] " + statement);

    this.connection.query(statement, function (err, results, fields) {
      if (err !== null) {
        throw err;
      }
      console.log("[ORM] Query success");
    });
  }
  private inject(dataModelRef: typeof DataModel) {
    const orm = this;
    Object.defineProperty(dataModelRef.prototype, "_orm", {
      get() {
        return orm;
      }
    });
  }
}
