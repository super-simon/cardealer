import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdvertService } from './advert.service';
import { CreateAdvertReqDto } from './dto/req/create-advert.req.dto';

@ApiTags('Advert')
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
    @Body() createAdvertDto: CreateAdvertReqDto,
    @CurrentUser() userData: IUserData,
  ) {
    return this.advertService.createMy(userData, createAdvertDto);
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.SELLER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':advertId')
  async remove(
    @Param('advertId') advertId: string,
    @CurrentUser() userData: IUserData,
  ) {
    console.log(advertId, userData.userId);
    return await this.advertService.remove(userData, advertId);
  }
}
