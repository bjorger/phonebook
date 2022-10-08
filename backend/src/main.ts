import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { RecordModule } from './record/record.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(RecordModule);
  await app.listen(port);

  Logger.log(`Server running on port ${port}`);
}
bootstrap();
