import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from "class-validator";
import { CategoryDto } from "src/modules/category/dto/category.dto";

export class BookDto {
    @Expose()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @Min(1, { message: 'Id da categoria deve ser um valor maior que zero' })
    id: number;
    
    @Expose()
    @IsString({ message: 'Título do livro deve ser uma string' })
    @IsNotEmpty({ message: 'Título do livro deve ser informado' })
    @MaxLength(100, { message: 'Título do livro deve conter até 100 caracteres' })
    title: string;
    
    @Expose()
    @IsString({ message: 'Nome do autor do livro deve ser uma string' })
    @IsNotEmpty({ message: 'Autor do livro deve ser informado' })
    @MaxLength(100, { message: 'Nome do autor do livro deve conter até 100 caracteres' })
    author: string;
    
    @Expose()
    @IsOptional()
    @IsString({ message: 'Descrição do livro deve ser uma string' })
    @MaxLength(100, { message: 'Descrição do livro deve conter até 100 caracteres' })
    description: string;
    
    @Expose()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @Max(new Date().getFullYear(), { message: `O ano de publicação não pode ser maior que o ano atual: ${new Date().getFullYear()}` })
    publicationYear: number;
    
    @Expose()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @Min(1, { message: 'O número de cópias deve ser maior que zero' })
    copies: number;
    
    @Expose() // É apenas leitura    
    availableCopies: number;
    
    @Expose()
    @Type(() => CategoryDto)
    @ValidateNested()
    category: CategoryDto;
}