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
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateModelReqDto } from './dto/req/create-model.dto';
import { UpdateModelReqDto } from './dto/req/update-model.dto';
import { ModelResDto } from './dto/res/model.res.dto';
import { ModelMapper } from './model.mapper';
import { ModelService } from './model.service';

@ApiTags('Model')
@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Brand not Found' })
  @Post()
  create(@Body() createModelReqDto: CreateModelReqDto) {
    return this.modelService.create(createModelReqDto);
  }

  @SkipAuth()
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':modelId')
  async findOne(@Param('modelId') brandId: string): Promise<ModelResDto> {
    return ModelMapper.toResponseDTO(await this.modelService.getOne(brandId));
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse()
  @Patch(':modelId')
  async update(
    @Param('modelId') modelId: string,
    @Body() updateModelReqDto: UpdateModelReqDto,
  ): Promise<ModelResDto> {
    return await this.modelService.update(modelId, updateModelReqDto);
  }

  @UseGuards(RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.MANAGER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':modelId')
  async remove(@Param('modelId') modelId: string) {
    return await this.modelService.remove(modelId);
  }
}
