import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const idRole = await this.rolesService.findByIdRole(userData.role_id);
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
      role: idRole || undefined,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roleId: user.role.id,
      roleName: user.role.role,
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
