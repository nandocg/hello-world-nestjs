import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as objConn from '../../config.json';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat], objConn.dbconnections.mysql_test.name),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
