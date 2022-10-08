import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordResolver, RecordService],
})
export class RecordModule {}
