import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailIsTakenException } from 'src/exceptions/emailIsTaken.exception';
import { InternalErrorException } from 'src/exceptions/internalError.exception';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user to be able to access the platform',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User creation payload',
  })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'List all users',
    description: 'list all users are active',
  })
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find the user by id or email',
  })
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update the user',
  })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const checkEmailExists = this.usersService.findOneByEmailAndId(
        updateUserDto.email,
        id,
      );
      if (checkEmailExists) {
        throw new EmailIsTakenException(updateUserDto.email);
      }

      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Soft delete not remove the row from the database',
  })
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }
}
