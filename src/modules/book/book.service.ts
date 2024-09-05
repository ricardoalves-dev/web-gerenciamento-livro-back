import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookCreateUpdateDto } from './dto/book.create-update.dto';
import { BookDto } from './dto/book.dto';
import { BookValidator } from './book.validator';
import { CategoryService } from '../category/category.service';
import { plainToInstance } from 'class-transformer';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService, 
                private readonly bookValidator: BookValidator, 
                @Inject(forwardRef(() => CategoryService)) private readonly categoryService: CategoryService) {}

    async createBook({ title, author, description, publicationYear, copies, category }: BookCreateUpdateDto): Promise<BookDto> {
        await this.bookValidator.validateTitleAndAuthor(title, author);
        await this.categoryService.findCategoryById(category.id);
        return plainToInstance(BookDto, await this.prisma.book.create({ 
            data: {
                title, author, description, publicationYear, copies, availableCopies: copies, categoryId: category.id
                },
            include: {
                category: true
            }}), {
                excludeExtraneousValues: true
            });
    }

    async findBooks(searchFields?: Partial<Book>): Promise<BookDto[]> {
        return plainToInstance(BookDto, await this.prisma.book.findMany({ where: { id: { gt: 0 }, AND: searchFields}, orderBy: { id: 'asc' }}), {
            excludeExtraneousValues: true
        });
    }

    async findBookById(id: number): Promise<BookDto> {
        const bookDto: BookDto | null = plainToInstance(BookDto, await this.prisma.book.findUnique({ where: { id }}), {
            excludeExtraneousValues: true
        });

        if(!bookDto) {
            throw new HttpException(`Livro de id ${id} não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        return bookDto;
    }

    async deleteBook(id: number): Promise<void> {
        const book = await this.findBookById(id);

        if(book.availableCopies !== book.copies) {
            throw new HttpException(`O livro possui exemplares reservados. Exclusão não é permitida`, HttpStatus.BAD_REQUEST);
        }

        await this.prisma.book.delete({ where: { id }});
        
        return;
    }

    async updateBook({ title, author, description, publicationYear, copies, category }: BookCreateUpdateDto, id: number): Promise<BookDto> {
        await this.findBookById(id);
        await this.bookValidator.validateTitleAndAuthor(title, author, id)
        return plainToInstance(BookDto, await this.prisma.book.update({ data: { title, author, description, publicationYear, copies, categoryId: category.id }, where: { id }}), {
          excludeExtraneousValues: true
        });

    }    

    async reserveBook(id: number): Promise<BookDto> {
        const book = await this.findBookById(id);

        if(! (book.availableCopies > 0)) {
            throw new HttpException(`Reserva indisponível no momento. Todos os exemplares do livro já se encontram reservados.`, HttpStatus.BAD_REQUEST);
        }

        book.availableCopies--;
        return plainToInstance(BookDto, await this.prisma.book.update({
            data: { availableCopies: book.availableCopies}, 
            where: { id }
        }), { excludeExtraneousValues: true} );
    }

    async returnBook(id: number): Promise<BookDto> {
        const book = await this.findBookById(id);    
        
        if(book.availableCopies === book.copies) {
            throw new HttpException(`Operação indisponível no momento. Nenhum exemplar do livro se encontra reservado.`, HttpStatus.BAD_REQUEST);
        }

        book.availableCopies++;
        return plainToInstance(BookDto, await this.prisma.book.update({
            data: { availableCopies: book.availableCopies}, 
            where: { id }
        }), { excludeExtraneousValues: true} );
    }
}
