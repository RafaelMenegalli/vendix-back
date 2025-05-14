import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 50, { message: 'O nome deve ter entre 2 e 50 caracteres.' })
  name: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @Length(0, 255, { message: 'A descrição pode ter até 255 caracteres.' })
  description: string;

  @IsNotEmpty({ message: 'O status ativo é obrigatório.' })
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  active: boolean;
}
