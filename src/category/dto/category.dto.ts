import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CategoryDto {
  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0, { message: 'Id deve ser maior que zero' })
  id: number;

  @IsString({ message: 'O nome da categoria deve ser uma string' })
  @IsNotEmpty({ message: 'O nome da categoria deve ser informado' })
  @MaxLength(30, {
    message: 'O nome da categoria deve conter até 30 caracteres',
  })
  name: string;
}
