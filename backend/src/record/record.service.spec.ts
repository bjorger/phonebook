import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { TypeOrmMongoDBTestingModule } from '../test-utils/mongo-db-in-memory';
import {
  closeInMongodConnection,
  testDatasetSeed,
} from '../test-utils/testData.seed';
import { RecordInput } from './record.input';

describe('RecordService', () => {
  let service: RecordService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [...TypeOrmMongoDBTestingModule()],
      providers: [RecordService],
    }).compile();

    service = module.get<RecordService>(RecordService);
    await testDatasetSeed();
  });

  afterAll(async () => {
    await module.close();
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return two records', async () => {
    expect(await service.findAll()).toHaveLength(2);
  });

  it('should return the input record', async () => {
    const recordToStore: RecordInput = {
      firstname: 'Sebastian',
      lastname: 'testington',
      phonenumber: '0664 1234567',
    };

    const result = await service.create(recordToStore);

    expect(result._id).toEqual(expect.any(String));
    expect(result).toMatchObject(recordToStore);
  });

  it('should return the amount of deleted documents', async () => {
    const recordId = '02d8293d-c370-4374-ac52-0dda77255ad7';

    const result = await service.delete(recordId);

    expect(result).toEqual(1);
  });

  it('should return the amount of updated objects', async () => {
    const recordId = '02d8293d-c370-4374-ac52-0dda77255ad7';
    const updatedRecord: RecordInput = {
      firstname: 'Update',
      lastname: 'testington',
      phonenumber: '1234567',
    };

    const result = await service.update(recordId, updatedRecord);

    expect(result).toEqual(1);
  });

  it('should return the record with the specified ID', async () => {
    const recordId = '02d8293d-c370-4374-ac52-0dda77255ad7';

    const result = await service.find(recordId);

    expect(result._id).toEqual(recordId);
  });

  it('should return the 1 records', async () => {
    const lastname = 'Braumann';

    const result = await service.findByLastName(lastname);

    expect(result).toHaveLength(1);
  });

  it('should throw an user not found error', async () => {
    try {
      await service.find(expect.any(String));
    } catch (e) {
      expect(e.response).toEqual('User not found');
      expect(e.status).toEqual(404);
    }
  });
});
