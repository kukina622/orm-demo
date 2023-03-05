import mysql from "mysql2";
import { DataModel } from "./DataModel";
import { createTableParser } from "./parser";

export class ORM {
  private connection: mysql.Connection;
  constructor(config: mysql.ConnectionOptions) {
    this.connection = mysql.createConnection(config);
  }
  public async register(dataModelRef: typeof DataModel): Promise<void> {
    this.inject(dataModelRef);
    const statement = createTableParser(dataModelRef);
    try {
      await this.query(statement);
    } catch (error) {
      throw error;
    }
  }
  private inject(dataModelRef: typeof DataModel) {
    const orm = this;
    Object.defineProperty(dataModelRef.prototype, "_orm", {
      get() {
        return orm;
      }
    });
  }

  public query(statement: string): Promise<any>;
  public query(statement: string, row: any[]): Promise<any>;
  public query(statement: string, row?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("[ORM] " + statement);
      if (row === undefined) {
        this.connection.query(statement, function (err, results, fields) {
          if (err !== null) reject(err);
          resolve([results, fields]);
        });
        return;
      }
      this.connection.query(statement, row, function (err, results, fields) {
        if (err !== null) reject(err);
        resolve([results, fields]);
      });
    });
  }
}
