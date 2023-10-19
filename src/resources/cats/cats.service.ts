import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as dbConn from '../../config.json';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat, dbConn.dbconnections.mysql_test.name)
    private catsRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsRepository.save({
      firstName: createCatDto.firstName,
      lastName: createCatDto.lastName,
    });
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catsRepository.findOneBy({ id });
  }

  update(id: number, updateCatDto: UpdateCatDto): Promise<UpdateResult> {
    const catObj: Cat = new Cat();
    catObj.firstName = updateCatDto.firstName;
    catObj.lastName = updateCatDto.lastName;
    catObj.id = id;
    return this.catsRepository.update(catObj.id, {
      firstName: catObj.firstName,
      lastName: catObj.lastName,
    });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.catsRepository.delete(id);
  }
}
