import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "A senha é obrigatório." })
    password: string;
}
