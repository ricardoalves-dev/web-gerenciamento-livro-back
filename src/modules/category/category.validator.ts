import { PrismaService } from "../prisma/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class CategoryValidator {
  constructor(private readonly prisma: PrismaService) {}

  public async validateCategoryNameExists(name: string, id?: number): Promise<void> {
    if (await this.prisma.category.findUnique({ where: { name , NOT: { id }}})) {
      throw new HttpException(`Categoria de nome ${name} já cadastrada`, HttpStatus.BAD_REQUEST);
    }
  }
}