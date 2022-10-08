import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
  ],
  providers: [RecordResolver, RecordService],
})
export class RecordModule {}
