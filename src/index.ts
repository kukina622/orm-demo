import { ORM, Field, DataType, DataModel } from "./ORM";

class AAA extends DataModel {
  @Field({ type: DataType.VARCHAR })
  A: String = "123";
}
