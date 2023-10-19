import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import * as compression from 'compression';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      // let's log errors into its own file
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-error.log`,
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
      }),
      // logging all level
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-combined.log`,
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
      }),
      // we also want to see logs in our console
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp(),
          format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger: logger });
  app.use(compression);
  await app.listen(3000);
}
bootstrap();
