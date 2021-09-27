import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, User, UserService } from '@rnm/domain';

@Controller('api/gateway/user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: User): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param() id: number, @Body() data: User): Promise<any> {
    return this.service.updateOne(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param() username: string): Promise<User | undefined> {
    return this.service.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param() id: string): Promise<any> {
    return this.service.deleteOne(id);
  }
}
