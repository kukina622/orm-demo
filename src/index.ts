import { ORM, Field, DataType, PK, DataModel } from "./ORM";

class Test extends DataModel {
  @PK
  @Field({ type: DataType.VARCHAR, length: 20 })
  name: String | undefined;

  @Field({ type: DataType.INT })
  age: number | undefined;
}

const orm = new ORM({
  database: "test",
  host: "127.0.0.1",
  password: "123456",
  user: "test"
});

orm.register(Test)
