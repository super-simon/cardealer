import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/api-file.decorator';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserByManagerDto } from './dto/req/update-user-by-manager.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserMapper } from './user.mapper';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    const result = await this.usersService.findMe(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResDto> {
    const result = await this.usersService.updateMe(userData, updateUserDto);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    const result = await this.usersService.findOne(userId);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiFile('avatar', false, false)
  @Post(':me/avatar')
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData, userId);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId/unfollow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userData, userId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @Post('create')
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    if (
      userData.role === RoleEnum.MANAGER &&
      (createUserDto.role === RoleEnum.ADMIN ||
        createUserDto.role === RoleEnum.MANAGER)
    ) {
      throw new ForbiddenException("You can't create a user with such role");
    }
    await this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':userId')
  public async update(
    @Body() updateUserByManagerDto: UpdateUserByManagerDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    const result = await this.usersService.update(
      userId,
      updateUserByManagerDto,
    );
    return UserMapper.toResponseDTO(result);
  }
}
