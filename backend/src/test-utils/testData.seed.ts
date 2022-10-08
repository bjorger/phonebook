import { DataSource } from 'typeorm';
import { Record } from '../record/record.entity';

export const testDatasetSeed = async () => {
  const testConnection = new DataSource({
    type: 'mongodb',
    database: ':memory:',
    dropSchema: true,
    entities: [Record],
    synchronize: true,
  });

  const datasource = await testConnection.initialize();

  const testRepository = await datasource.getMongoRepository(Record);

  testRepository.insert({
    firstname: 'Robin',
    lastname: 'Braumann',
    phonenumber: '0680 5034612',
  });
};
