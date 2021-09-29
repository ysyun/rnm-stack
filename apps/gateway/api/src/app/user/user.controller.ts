import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';

import { JwtAuthGuard, UserService } from '@rnm/domain';
import { User } from '@rnm/model';
import { CookieInterceptor } from '@rnm/shared';

// @UseInterceptors(CookieInterceptor)
@Controller('api/gateway/user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: User): Promise<User> {
    const savedUser = await this.service.create(data);
    if (!savedUser) {
      return;
    }
    return savedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() data: User): Promise<any> {
    return this.service.updateOne(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string): Promise<User | undefined> {
    return this.service.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.service.deleteOne(id);
  }
}
