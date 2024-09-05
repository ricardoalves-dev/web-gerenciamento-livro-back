import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [CategoryModule, PrismaModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
