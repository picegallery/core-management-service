import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'constants/repository';
import { AuthType, User } from './entities/user.entity';
import { CognitoService } from 'src/auth/cognito/cognito.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    private readonly cognitoService: CognitoService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const cognitoUser = await this.cognitoService.createCognitoUser(
        createUserDto.email,
        createUserDto.password,
        createUserDto.userType,
        createUserDto.authType,
      );

      const user = this.userRepository.create({
        ...createUserDto,
        authType: AuthType.DEFAULT,
      });

      await this.userRepository.save(user);

      return cognitoUser;
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
    return this.userRepository.findOneBy({ email });
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
