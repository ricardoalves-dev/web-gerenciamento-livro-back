import { OmitType } from "@nestjs/mapped-types";
import { BookDto } from "./book.dto";
import { Expose, Type } from "class-transformer";
import { CategoryDto } from "src/modules/category/dto/category.dto";
import { ValidateNested } from "class-validator";

export class BookCreateUpdateDto extends OmitType(BookDto, ['id', 'availableCopies', 'category'] as const) {
    
    @Expose()
    @Type(() => OmitType(CategoryDto, ['name']))
    @ValidateNested()
    category: CategoryDto;
}