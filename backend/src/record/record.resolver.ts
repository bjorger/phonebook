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
  async createRecord(@Args('record') recordInput: RecordInput) {
    return await this.recordService.create(recordInput);
  }

  @Mutation(() => Number)
  async deleteRecord(@Args('id') recordId: string) {
    return await this.recordService.delete(recordId);
  }

  @Mutation(() => Record)
  async findRecord(@Args('id') recordId: string) {
    return await this.recordService.find(recordId);
  }

  @Mutation(() => Number)
  async updateRecord(
    @Args('id') recordId: string,
    @Args('record') record: RecordInput,
  ) {
    return this.recordService.update(recordId, record);
  }
}
