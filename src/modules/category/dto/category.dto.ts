import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CategoryDto {
  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1, { message: 'Id da categoria deve ser um valor maior que zero' })
  id: number;

  @Expose()
  @IsString({ message: 'Nome da categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Nome da categoria deve ser informado' })
  @MaxLength(50, { message: 'Nome da categoria deve conter até 50 caracteres' })
  name: string;
}