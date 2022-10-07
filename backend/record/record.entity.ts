import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Record {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  phonenumber: string;
}
