import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Record } from './record.entity';
import { RecordInput } from './record.input';
import * as uuid from 'uuid';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: MongoRepository<Record>,
  ) {}

  async findAll(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  async create(recordInput: RecordInput): Promise<Record> {
    const record = new Record();
    record._id = uuid.v4();
    record.firstname = recordInput.firstname;
    record.lastname = recordInput.lastname;
    record.phonenumber = recordInput.phonenumber;
    return this.recordRepository.save(record);
  }

  async delete(id: string): Promise<number> {
    const result = await this.recordRepository.deleteOne({
      _id: id,
    });

    return result.deletedCount;
  }

  async find(id: string): Promise<Record> {
    const result = await this.recordRepository.findOneBy({ _id: id });

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
