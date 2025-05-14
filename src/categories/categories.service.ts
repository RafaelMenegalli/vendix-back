import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const alreadyExistName = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    })

    if (alreadyExistName) {
      throw new BadRequestException("Já existe uma categoria com esse nome.")
    }

    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        active: createCategoryDto.active,
        createdAt: new Date()
      }
    })

    return {
      message: "Categoria criada com sucesso.",
      data: category
    };
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id }
    })

    return category;
  }

  async findActive() {
    return this.prisma.category.findMany({
      where: { active: true },
      orderBy: { name: 'asc' }
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
        active: updateCategoryDto.active,
      },
      where: {
        id
      }
    })

    return {
      message: "Categoria atualizada com sucesso",
      data: category
    }
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({
      where: { id }
    })

    return {
      message: "Categoria removida com sucesso",
      data: category
    }
  }
}
