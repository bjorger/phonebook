import { DataSource } from 'typeorm';
import { Record } from '../record/record.entity';

let testConnection: DataSource;

export const testDatasetSeed = async () => {
  testConnection = new DataSource({
    type: 'mongodb',
    database: ':memory:',
    dropSchema: true,
    entities: [Record],
    synchronize: true,
  });

  const datasource = await testConnection.initialize();

  const testRepository = await datasource.getMongoRepository(Record);

  await testRepository.insert({
    _id: '0725f568-a4a4-4ec6-ad05-77aa6dd53226',
    firstname: 'Robin',
    lastname: 'Braumann',
  });

  await testRepository.insert({
    _id: '02d8293d-c370-4374-ac52-0dda77255ad7',
    firstname: 'Peter',
    lastname: 'Hans',
  });
};

export const closeInMongodConnection = async () => {
  if (testConnection) await testConnection.destroy();
};
