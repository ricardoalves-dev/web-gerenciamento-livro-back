import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookValidator {
    constructor(private readonly prisma: PrismaService) {}

    async validateTitleAndAuthor(title: string, author: string, id?: number): Promise<void> {
        
        if(await this.prisma.book.findUnique({
            where: {
                NOT: { id },
                title_author: { title, author }
            }
        })) {
            throw new HttpException(`Livro de título ${title} já cadastrado para o autor ${author}`, HttpStatus.BAD_REQUEST);
        }
    }
}