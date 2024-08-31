import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CategoryValidator {
  constructor(private readonly prisma: PrismaService) {}

  async validateUniqueName(name: string, id?: number): Promise<void> {
    if (
      await this.prisma.category.findUnique({
        where: { name, AND: { NOT: { id } } },
      })
    ) {
      throw new HttpException(
        `Categoria de nome ${name} já cadastrada`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
