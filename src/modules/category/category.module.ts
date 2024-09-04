import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryValidator } from './category.validator';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CategoryValidator, PrismaService],
  controllers: [CategoryController],
  exports: [PrismaService],
})
export class CategoryModule {}
