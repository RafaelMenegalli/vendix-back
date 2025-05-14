import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const alreadyExistProduct = await this.prisma.product.findUnique({
      where: { name: createProductDto.name }
    })

    if (alreadyExistProduct) {
      throw new BadGatewayException("Já existe um produto com este nome.")
    }

    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        image: createProductDto.image,
        description: createProductDto.description,
        active: createProductDto.active,
        createdAt: new Date(),
        category: {
          connect: { id: createProductDto.categoryId }
        }
      },
      include: {
        category: true
      }
    })

    return {
      message: "Produto criado com sucesso",
      data: product
    }
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        active: updateProductDto.active,
        image: updateProductDto.image,
        price: updateProductDto.price,
        category: {
          connect: { id: updateProductDto.categoryId }
        }
      },
      where: { id }
    })

    return {
      message: "Produto atualizado com sucesso",
      data: product
    }
  }

  async remove(id: number) {
    const product = await this.prisma.product.delete({
      where: { id }
    })

    return {
      message: "Produto removido com sucesso",
      data: product
    }
  }
}
