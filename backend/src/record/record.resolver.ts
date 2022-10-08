import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Record } from './record.entity';
import { RecordInput } from './record.input';
import { RecordService } from './record.service';

@Resolver('Record')
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Query(() => [Record])
  async records(@Args('take') take: number, @Args('skip') skip: number) {
    return await this.recordService.findAll(take, skip);
  }

  @Query(() => Record)
  async record(@Args('id') recordId: string) {
    return await this.recordService.find(recordId);
  }

  @Mutation(() => Record)
  async createRecord(@Args('record') recordInput: RecordInput) {
    return await this.recordService.create(recordInput);
  }

  @Mutation(() => Number)
  async deleteRecord(@Args('id') recordId: string) {
    return await this.recordService.delete(recordId);
  }

  @Mutation(() => Number)
  async updateRecord(
    @Args('id') recordId: string,
    @Args('record') record: RecordInput,
  ) {
    return this.recordService.update(recordId, record);
  }
}
