import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Owner)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./products',
      filename: (req, file, cb) => {
        cb(null, `${req.body.image_file}${extname(file.originalname)}`)
      }
    })
  }))
  async create(@Body() createProductDto: CreateProductDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize:10240000}),
        new FileTypeValidator({fileType:'[/image/]'})
      ]
    })
  ) file: Express.Multer.File) {
    // console.log(createProductDto, file);
    return await this.productsService.create(createProductDto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./products',
      filename: (req, file, cb) => {
        cb(null, `${req.body.image_file}${extname(file.originalname)}`)
      }
    })
  }))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile(
    // new ParseFilePipe({
    //   validators: [
    //     new MaxFileSizeValidator({maxSize:10240000}),
    //     new FileTypeValidator({fileType:'[/image/]'})
    //   ]
    // })
  ) file: Express.Multer.File) {
    return await this.productsService.update(id, updateProductDto, file);
  }

  @Post('activation/:id')
  async activation(@Param('id') id: string) {
    return await this.productsService.activation(id);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
