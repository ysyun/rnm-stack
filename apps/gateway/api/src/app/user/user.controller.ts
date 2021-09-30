import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, UserService } from '@rnm/domain';
import { User, UserRole } from '@rnm/model';
import { Roles } from '@rnm/shared';

@Controller('api/gateway/user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
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
