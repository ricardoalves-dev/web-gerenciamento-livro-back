import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryCreateUpdateDto } from './dto/category.create-update.dto';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CategoryValidator } from './category.validator';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryValidator: CategoryValidator,
  ) {}

  async createCategory({
    name,
  }: CategoryCreateUpdateDto): Promise<CategoryDto> {
    await this.categoryValidator.validateUniqueName(name);
    return this.prisma.category.create({ data: { name } });
  }

  async findCategories(): Promise<CategoryDto[]> {
    return await this.prisma.category.findMany({ where: { id: { gt: 0 } } });
  }

  async findCategoryById(id: number): Promise<CategoryDto> {
    console.log(id);
    const categoryDto: CategoryDto | null =
      await this.prisma.category.findUnique({ where: { id: id } });

    if (!categoryDto) {
      throw new HttpException(
        `Categoria de id ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return categoryDto;
  }

  async updateCategory(
    { name }: CategoryCreateUpdateDto,
    id: number,
  ): Promise<CategoryDto> {
    await this.findCategoryById(id);
    await this.categoryValidator.validateUniqueName(name, id);
    return this.prisma.category.update({ data: { name }, where: { id: id } });
  }

  async deleteCategory(id: number): Promise<object> {
    await this.findCategoryById(id);
    await this.prisma.category.delete({ where: { id: id } });

    return {};
  }
}
