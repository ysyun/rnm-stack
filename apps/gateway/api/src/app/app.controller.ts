import { Body, Controller, Get, Post } from '@nestjs/common';

import { GatewayApiAppService } from '@rnm/domain';

// import { Role, User as UserModel } from '@prisma/client';

@Controller('api/gateway')
export class AppController {
  constructor(
    private readonly appService: GatewayApiAppService
  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  // @Post('user')
  // async createUser(@Body() userData: {
  //   email: string,
  //   password: string,
  //   firstname: string,
  //   lastname; string,
  //   role: Role
  // }): Promise<UserModel> {
  //   const { email, password, firstname, lastname, role } = userData;
  //   return this.dbService.user.create({
  //     data: {
  //       email,
  //       password,
  //       firstname,
  //       lastname,
  //       role: !role ? Role.USER : role
  //     }
  //   });
  // }
}
