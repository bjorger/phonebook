import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

  async findAll(take = 25, skip = 0): Promise<Record[]> {
    Logger.log('Returning records');
    return this.recordRepository.find({ skip, take });
  }

  async create(recordInput: RecordInput): Promise<Record> {
    const record = new Record();
    record._id = uuid.v4();
    record.firstname = recordInput.firstname;
    record.lastname = recordInput.lastname;
    record.phonenumber = recordInput.phonenumber;

    Logger.log(`Creating record with id ${record._id}`);

    return this.recordRepository.save(record);
  }

  async delete(id: string): Promise<number> {
    const result = await this.recordRepository.deleteOne({
      _id: id,
    });

    Logger.log(`Deleting record with id ${id}`);

    return result.deletedCount;
  }

  async find(id: string): Promise<Record> {
    const result = await this.recordRepository.findOneBy({ _id: id });

    Logger.log(`Finding record with id ${id}`);

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findByLastName(lastname: string): Promise<Record[]> {
    const result = await this.recordRepository.findBy({
      where: {
        lastname: {
          $eq: lastname,
        },
      },
    });

    console.log(result);

    Logger.log(`Finding records with lastname ${lastname}`);

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async update(id: string, record: RecordInput): Promise<number> {
    const result = await this.recordRepository.update(
      {
        _id: id,
      },
      record,
    );

    Logger.log(`Updating record with id ${id}`);

    return result.affected;
  }
}
