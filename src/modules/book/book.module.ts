import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { BookValidator } from './book.validator';

@Module({
  imports: [PrismaModule, (forwardRef(() => CategoryModule)) ],
  providers: [PrismaService, BookService, CategoryService, BookValidator],
  controllers: [BookController],
  exports: [BookService, BookValidator]
})
export class BookModule {}
