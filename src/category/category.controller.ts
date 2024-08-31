import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateUpdateDto } from './dto/category.create-update.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() categoryDto: CategoryCreateUpdateDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Get('/:id')
  async findCategortById(@Param('id') id: number): Promise<CategoryDto> {
    console.log('id', id);
    return await this.categoryService.findCategoryById(id);
  }

  @Get()
  async findCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findCategories();
  }

  @Put('/:id')
  async updateCategory(
    @Body() categoryDto: CategoryCreateUpdateDto,
    @Param('id') id: number,
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(categoryDto, id);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: number): Promise<object> {
    return await this.categoryService.deleteCategory(id);
  }
}
