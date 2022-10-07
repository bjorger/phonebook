import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Record } from './record.entity';
import { RecordInput } from './record.input';
import { RecordService } from './record.service';

@Resolver('Record')
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Query(() => [Record])
  async records() {
    return this.recordService.findAll();
  }

  @Mutation(() => Record)
  async createRecord(@Args('input') recordInput: RecordInput) {
    return await this.recordService.create(recordInput);
  }
}
