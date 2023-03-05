import { ORM, Field, DataType, PK, DataModel } from "./ORM";

class Test extends DataModel {
  @PK
  @Field({ type: DataType.VARCHAR, length: 20 })
  name: String;

  @Field({ type: DataType.INT })
  age: number;

  constructor(param: Test = {} as Test) {
    super();
    const { name, age } = param;
    this.name = name;
    this.age = age;
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
  
  new Test().findAll<Test>()
})()
