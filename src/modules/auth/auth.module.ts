import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesModule } from '../roles/roles.module';
import { JwtStrategy } from './jwt.estrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn: '1d',
        },
      }),
    })
  ]
})
export class AuthModule {}
