import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as objConn from '../config.json';
const dbconnections: any[] = [];
Object.keys(objConn.dbconnections).forEach((key: string) => {
  dbconnections.push(TypeOrmModule.forRoot(objConn.dbconnections[key]));
});

@Module({
  imports: dbconnections,
  exports: [TypeOrmModule],
})
export class DBConnModule {}
