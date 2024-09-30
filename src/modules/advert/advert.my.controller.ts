import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdvertEntity } from 'src/database/entities/advert.entity';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdvertMyMapper } from './advert.my.mapper';
import { AdvertService } from './advert.service';
import { CreateMyAdvertReqDto } from './dto/req/create-my-advert.req.dto';
import { UpdateMyAdvertReqDto } from './dto/req/update-my-advert.req.dto';
import { AdvertMyListItemResDto } from './dto/res/advert-my-list-item.res.dto';

@ApiTags('My Advert')
@Controller('adverts/my')
export class AdvertMyController {
  constructor(private readonly advertService: AdvertService) {}

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.SELLER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Model not Found' })
  @Post()
  create(
    @Body() createMyAdvertDto: CreateMyAdvertReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertEntity> {
    return this.advertService.createMy(userData, createMyAdvertDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getMyList(
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertMyListItemResDto[]> {
    const adverts = await this.advertService.getMyList(userData);
    const res = AdvertMyMapper.toResponseListDTO(adverts);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.SELLER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse()
  @Patch(':advertId')
  async updateMy(
    @Param('advertId') advertId: string,
    @Body() updateMyAdvertReqDto: UpdateMyAdvertReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertEntity> {
    return await this.advertService.updateMy(
      userData,
      advertId,
      updateMyAdvertReqDto,
    );
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.SELLER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':advertId')
  async removeMy(
    @Param('advertId') advertId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    return await this.advertService.removeMy(userData, advertId);
  }
}
