import mysql from "mysql2";

export default class ORM {
  private connection: mysql.Connection;
  constructor(config: mysql.ConnectionOptions) {
    this.connection = mysql.createConnection(config);
  }
}
