import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserResponseDto } from "../users/dto/userResponse.dto";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  async register(@Body() userData: RegisterDto): Promise<UserResponseDto> {
    const user =  await this.authService.register(userData);

    return plainToInstance(
      UserResponseDto,
      user,
      { excludeExtraneousValues: true }
    );
  }

  @Post("login")
  async login(@Body() dataLogin: LoginDto) {
    return this.authService.login(dataLogin.email, dataLogin.password);
  }


  //Prueba de ruta protegida
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile() {
    return { message: "User profile data would be here." };
  }
}
