import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookCreateUpdateDto } from './dto/book.create-update.dto';
import { BookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    async createBook(@Body() bookDto: BookCreateUpdateDto): Promise<BookDto> {        
        return await this.bookService.createBook(bookDto);
    }

    @Get()
    async findBooks(): Promise<BookDto[]> {        
        return await this.bookService.findBooks();
    }

    @Get('/:id')
    async findBookById(@Param('id') id: number): Promise<BookDto> {        
        return await this.bookService.findBookById(id);
    }

    @Put('/:id')
    async updateBook(@Body() bookDto: BookCreateUpdateDto, @Param('id') id: number): Promise<BookDto> {
        return await this.bookService.updateBook(bookDto, id);
    }

    @Delete('/:id')
    async deleteBook(@Param('id') id: number): Promise<void> {
        await this.bookService.deleteBook(id);
        return;
    }

    @Put('/reserve/:id')
    async reserveBook(@Param('id') id: number): Promise<BookDto> {
        return await this.bookService.reserveBook(id);
    }

    @Put('/return/:id')
    async returnBook(@Param('id') id: number): Promise<BookDto> {
        return await this.bookService.returnBook(id);
    }
}
