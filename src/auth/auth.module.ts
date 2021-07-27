import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
