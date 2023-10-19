import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './resources/cats/cats.module';
import { DBConnModule } from './dbconn.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [DBConnModule, CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
