import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdvertService } from './advert.service';
import { UpdateAdvertReqDto } from './dto/req/update-advert.req.dto';
import { AdvertListItemResDto } from './dto/res/advert-list-item.res.dto copy';
import { AdvertMapper } from './advert.mapper';

@ApiTags('Adverts (for manager)')
@Controller('adverts')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.MANAGER, RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse()
  @Patch(':advertId')
  async update(
    @Param('advertId') advertId: string,
    @Body() updateAdvertReqDto: UpdateAdvertReqDto,
  ): Promise<AdvertEntity> {
    return await this.advertService.update(advertId, updateAdvertReqDto);
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.MANAGER, RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getList(): Promise<AdvertListItemResDto[]> {
    const adverts = await this.advertService.getList();
    const res = AdvertMapper.toResponseListDTO(adverts);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.MANAGER, RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':advertId')
  async removeMy(@Param('advertId') advertId: string): Promise<void> {
    return await this.advertService.remove(advertId);
  }
}
