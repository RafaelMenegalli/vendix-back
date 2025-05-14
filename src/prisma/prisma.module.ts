import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // opcional se você quiser usar o PrismaService globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <- isso é importante
})
export class PrismaModule {}
