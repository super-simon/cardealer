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
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BrandMapper } from './brand.mapper';
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
  @ApiConflictResponse()
  @Post()
  async create(
    @Body() createBrandReqDto: CreateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.create(createBrandReqDto);
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

  @SkipAuth()
  @Get()
  async getList(): Promise<BrandResDto[]> {
    return BrandMapper.toResponseListDTO(await this.brandService.getList());
  }

  @SkipAuth()
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':brandId')
  async findOne(@Param('brandId') brandId: string): Promise<BrandResDto> {
    return BrandMapper.toResponseDTO(await this.brandService.getOne(brandId));
  }

  @SkipAuth()
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get('by-name/:brandName')
  async findOneByName(
    @Param('brandName') brandName: string,
  ): Promise<BrandResDto> {
    return BrandMapper.toResponseDTO(
      await this.brandService.getOneByName(brandName),
    );
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiConflictResponse()
  @Delete(':brandId')
  async remove(@Param('brandId') brandId: string) {
    return await this.brandService.remove(brandId);
  }
}
