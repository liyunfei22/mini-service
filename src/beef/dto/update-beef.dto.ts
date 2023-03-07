import { PartialType } from '@nestjs/mapped-types';
import { CreateBeefDto } from './create-beef.dto';

export class UpdateBeefDto extends PartialType(CreateBeefDto) {}
