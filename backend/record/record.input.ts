import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class RecordInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  phonenumber: string;
}
