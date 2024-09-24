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
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BrandService } from './brand.service';
import { CreateBrandReqDto } from './dto/req/create-brand.dto';
import { UpdateBrandReqDto } from './dto/req/update-brand.dto';
import { BrandResDto } from './dto/res/brand.res.dto';

@Controller('brands')
@ApiTags('Brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  create(@Body() createBrandReqDto: CreateBrandReqDto): Promise<BrandResDto> {
    return this.brandService.create(createBrandReqDto);
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse()
  @Patch(':brandId')
  async update(
    @Param('brandId') brandId: string,
    @Body() updateBrandReqDto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.update(brandId, updateBrandReqDto);
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse()
  @Patch('by-name/:brandName')
  async updateByName(
    @Param('brandName') brandName: string,
    @Body() updateBrandReqDto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.updateByName(brandName, updateBrandReqDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':brandId')
  findOne(@Param('brandId') brandId: string) {
    return this.brandService.findOne(brandId);
  }

  @Get('by-name/:brandName')
  findOneByName(@Param('brandName') brandName: string) {
    return this.brandService.findOneByName(brandName);
  }

  @Delete(':brandId')
  remove(@Param('brandId') brandId: string) {
    return this.brandService.remove(brandId);
  }
}
