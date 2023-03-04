import mysql from "mysql2";
import { DataModel } from "./DataModel";
import { createTableParser } from "./parser";

export class ORM {
  private connection: mysql.Connection;
  constructor(config: mysql.ConnectionOptions) {
    this.connection = mysql.createConnection(config);
  }
  public register(dataModelRef: typeof DataModel) {
    const statement = createTableParser(dataModelRef);
    console.log("[ORM] " + statement);

    this.connection.query(statement, function (err, results, fields) {
      console.log(results);
    });
  }
}
