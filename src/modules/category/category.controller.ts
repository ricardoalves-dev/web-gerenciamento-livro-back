import { Body, Controller, Post, Get, Delete, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateUpdateDto } from './dto/category.create-update.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryDto: CategoryCreateUpdateDto): Promise<CategoryDto> {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Get()
  async findCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findCategories();
  }

  @Get('/:id')
  async findCategoryById(@Param('id') id: number): Promise<CategoryDto> {
    return await this.categoryService.findCategoryById(id);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return await this.categoryService.deleteCategory(id);
  }

  @Put('/:id')
  async updateCategory(@Body() categoryDto: CategoryCreateUpdateDto, @Param('id') id: number): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(categoryDto, id);
  }
}
