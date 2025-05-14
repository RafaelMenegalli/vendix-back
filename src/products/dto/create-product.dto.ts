import { IsString, IsNumber, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 100, { message: 'O nome deve ter entre 2 e 100 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'O preço é obrigatório.' })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  price: number;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @Length(0, 255, { message: 'A descrição pode ter até 255 caracteres.' })
  description: string;

  @IsNotEmpty({ message: 'A imagem é obrigatória.' })
  @IsString({ message: 'A imagem deve ser uma string.' })
  image: string;

  @IsNotEmpty({ message: 'O status ativo é obrigatório.' })
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  active: boolean;

  @IsNotEmpty({ message: 'A categoria é obrigatória.' })
  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  categoryId: number;
}
