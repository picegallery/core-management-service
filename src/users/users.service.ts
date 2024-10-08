import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryEnum } from 'constants/repository';
import { AuthType, User } from './entities/user.entity';
import { CognitoService } from 'src/auth/cognito/cognito.service';
import { EmailIsTakenException } from 'src/shared/exceptions/emailIsTaken.exception';
import { plainToClass } from 'class-transformer';
import { EmailNotFoundException } from 'src/shared/exceptions/emailNotFound.exception';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private userRepository: Repository<User>,
    private readonly cognitoService: CognitoService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkEmailExists = await this.findOneByEmail(createUserDto.email);
      if (checkEmailExists) {
        throw new EmailIsTakenException(createUserDto.email);
      }

      await this.cognitoService.createCognitoUser(
        createUserDto.email,
        createUserDto.password,
        createUserDto.userType,
        createUserDto.authType,
      );
      const hashPass = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        authType: AuthType.DEFAULT,
        password: hashPass,
      });

      await this.userRepository.save(user);

      return plainToClass(User, user, { excludeExtraneousValues: false });
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }

  findAll() {
    return this.userRepository.find({
      order: { createdDate: 'ASC', deletedDate: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    try {
      const user = this.userRepository.findOneBy({ email });
      if (!user) {
        throw new EmailNotFoundException();
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }

  findOneByEmailAndId(email: string, id: string) {
    return this.userRepository.find({ where: [{ email }, { id }] });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
