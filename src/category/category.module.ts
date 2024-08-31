import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CategoryValidator } from './category.validator';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CategoryValidator],
  controllers: [CategoryController],
})
export class CategoryModule {}
