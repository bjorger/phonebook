import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../record/record.entity';

export const TypeOrmMongoDBTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mongodb',
    database: ':memory:',
    dropSchema: true,
    entities: [Record],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Record]),
];
