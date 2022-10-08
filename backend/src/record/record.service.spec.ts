import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Record } from './record.entity';

describe('RecordService', () => {
  let service: RecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordService,
        {
          provide: getRepositoryToken(Record),
          useValue: {
            find: jest.fn(() => [
              {
                _id: '0725f568-a4a4-4ec6-ad05-77aa6dd53226',
                firstname: 'Robin',
                lastname: 'Braumann',
              },
              {
                _id: '02d8293d-c370-4374-ac52-0dda77255ad7',
                firstname: 'Peter',
                lastname: 'Hans',
              },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<RecordService>(RecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should do something', async () => {
    expect(await service.findAll()).toHaveLength(2);
  });
});
