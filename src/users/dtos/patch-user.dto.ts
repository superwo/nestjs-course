import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {
  // This class will automatically inherit all properties from CreateUserDto
  // and make them optional.
  // You can add additional properties or methods if needed.
}
