import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryCreateUpdateDto } from './dto/category.create-update.dto';
import { CategoryDto } from './dto/category.dto';
import { plainToInstance } from 'class-transformer';
import { CategoryValidator } from './category.validator';
import { BookService } from '../book/book.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService, 
              private readonly categoryValidator: CategoryValidator,
              @Inject(forwardRef(() => BookService)) private readonly bookService: BookService) {}

  async createCategory({ name }: CategoryCreateUpdateDto): Promise<CategoryDto> {
    await this.categoryValidator.validateCategoryNameExists(name);
    return plainToInstance(CategoryDto, await this.prisma.category.create({ data: { name } }), { excludeExtraneousValues: true });
  }

  async findCategories(): Promise<CategoryDto[]> {
    return plainToInstance(CategoryDto, await this.prisma.category.findMany({ where: { id: { gt: 0 }}}), {
      excludeExtraneousValues: true
    });
  }

  async findCategoryById(id: number): Promise<CategoryDto> {
    const categoryDto: CategoryDto | null = plainToInstance(CategoryDto, await this.prisma.category.findUnique({ where: { id }}), {
      excludeExtraneousValues: true
    });

    if(!categoryDto) {
      throw new HttpException(`Categoria de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return categoryDto;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.findCategoryById(id);
    if((await this.bookService.findBooks({ categoryId: id })).length > 0) {
      throw new HttpException(`Existem livros vinculados a categoria de id ${id}. Exclusão não é permitida`, HttpStatus.CONFLICT);
    }
    await this.prisma.category.delete({ where: { id }});
    
    return;
  }
  
  async updateCategory({ name }: CategoryCreateUpdateDto, id: number): Promise<CategoryDto> {
    await this.findCategoryById(id);
    await this.categoryValidator.validateCategoryNameExists(name, id);
    return plainToInstance(CategoryDto, await this.prisma.category.update({ data: { name }, where: { id }}), {
      excludeExtraneousValues: true
    });
  }
}
