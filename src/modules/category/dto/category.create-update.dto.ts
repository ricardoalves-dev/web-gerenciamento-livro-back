import { OmitType } from "@nestjs/mapped-types";
import { CategoryDto } from "./category.dto";

export class CategoryCreateUpdateDto extends OmitType(CategoryDto, ['id'] as const) {}