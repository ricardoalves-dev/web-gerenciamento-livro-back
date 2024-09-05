import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryValidator } from './category.validator';
import { BookModule } from '../book/book.module';
import { BookService } from '../book/book.service';
import { BookValidator } from '../book/book.validator';

@Module({
  imports: [PrismaModule, forwardRef(() => BookModule)],
  providers: [CategoryService, CategoryValidator, PrismaService, BookService, BookValidator],
  controllers: [CategoryController],
  exports: [CategoryService, CategoryValidator],
})
export class CategoryModule {}
