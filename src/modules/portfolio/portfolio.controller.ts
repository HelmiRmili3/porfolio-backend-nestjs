/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Req,
  Res,
  BadRequestException,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Portfolio } from 'src/entities/portfolio.entity';
import { CreateExperienceDto } from './dto/experience.dto';
import { CreateProjectDto } from './dto/project.dto';
import { CreateSkillDto } from './dto/skill.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiBearerAuth()
  @Get(':id')
  portfolio(@Param('id') id: string): Promise<Portfolio> {
    return this.portfolioService.findOne(id);
  }

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Res() reply: any,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    try {
      // Check if the request is multipart
      if (!req.isMultipart()) {
        throw new BadRequestException('Request is not multipart');
      }

      // Object to store the results of uploaded files
      const fileUrls: { [fieldname: string]: string } = {};

      // Iterate over all parts of the request (fields and files)
      for await (const part of req.parts()) {
        if (part.type === 'file') {
          // Handle file uploads
          console.log('Uploaded file:', part.filename);
          console.log('Fieldname:', part.fieldname);
          console.log('Mimetype:', part.mimetype);

          // Ensure the mimetype is valid
          if (!part.mimetype || part.mimetype === 'multipart/form-data') {
            throw new BadRequestException('Invalid file mimetype');
          }

          // Convert the file stream to a buffer
          const buffer = await part.toBuffer();

          // Pass the buffer to the Cloudinary service
          const result = await this.cloudinaryService.uploadMedia(
            buffer,
            part.mimetype,
          );

          // Store the URL of the uploaded file using the fieldname as the key
          fileUrls[part.fieldname] = result.secure_url;
        } else if (part.type === 'field') {
          // Handle text fields
          console.log('Field:', part.fieldname, part.value);
          createPortfolioDto[part.fieldname] = part.value;
        }
      }

      // Assign the file URLs to the DTO
      createPortfolioDto.cvlink = fileUrls['cvlink'];
      createPortfolioDto.profilepicture = fileUrls['profilepicture'];
      createPortfolioDto.aboutpicture = fileUrls['aboutpicture'];

      // Log the final DTO for debugging
      console.log('Final DTO:', createPortfolioDto);

      // Save the portfolio
      await this.portfolioService.create(createPortfolioDto);

      reply.code(200).send(createPortfolioDto);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      reply.code(500).send({ error: 'Error creating portfolio' });
    }
  }
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() portfolio: Portfolio,
  ): Promise<Portfolio> {
    return this.portfolioService.update(id, portfolio);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.portfolioService.delete(id);
  }
  // experience routes
  @ApiBearerAuth()
  @Post('/experience/create')
  async addExperience(
    @Res() reply: any,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    this.portfolioService
      .addExperience(createExperienceDto)
      .then(() => {
        reply.code(200).send({ message: 'Experience added successfully' });
      })
      .catch((error) => {
        reply.code(500).send({ error: 'Error adding experience' });
      });
  }

  // projects routes
  @ApiBearerAuth()
  @Post('/projects/create')
  async addProject(
    @Res() reply: any,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    this.portfolioService
      .addProject(createProjectDto)
      .then(() => {
        reply.code(200).send({ message: 'Experience added successfully' });
      })
      .catch((error) => {
        reply.code(500).send({ error: 'Error adding experience' });
      });
  }

  // skills routes
  @ApiBearerAuth()
  @Post('/skill/create')
  async addSkill(@Res() reply: any, @Body() createSkillDto: CreateSkillDto) {
    this.portfolioService
      .addSkill(createSkillDto)
      .then(() => {
        reply.code(200).send({ message: 'Experience added successfully' });
      })
      .catch((error) => {
        reply.code(500).send({ error: 'Error adding experience' });
      });
  }
}
