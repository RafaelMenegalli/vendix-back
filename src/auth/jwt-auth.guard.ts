// src/auth/jwt-auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { IS_PUBLIC_KEY } from './public.decorator';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) return true;
  
      const request = context.switchToHttp().getRequest();
      const auth = request.headers.authorization;
  
      if (!auth?.startsWith('Bearer ')) return false;
  
      try {
        const token = auth.split(' ')[1];
        const decoded = this.jwtService.verify(token);
        request.user = decoded;
        return true;
      } catch {
        return false;
      }
    }
  }
  