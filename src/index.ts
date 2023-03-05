import { ORM, Field, DataType, PK, DataModel } from "./ORM";

class Test extends DataModel {
  @PK
  @Field({ type: DataType.VARCHAR, length: 20 })
  name: String | undefined;

  @Field({ type: DataType.INT })
  age: number | undefined;

  constructor();
  constructor(param: { name: String; age: number });
  constructor(param?: { name: String; age: number }) {
    super();
    if (param !== undefined) {
      const { name, age } = param;
      this.name = name;
      this.age = age;
    }
  }
}

(async function () {
  const orm = new ORM({
    database: "test",
    host: "127.0.0.1",
    password: "123456",
    user: "test"
  });

  await orm.register(Test);

  console.log("-------------------------------");
  console.log(new Test({ name: "CCCCCC", age: 123 }).save());
})();
