import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exporting AuthService so it can be used in other modules
  imports: [forwardRef(() => UsersModule)], // Importing UsersModule to use its services
})
export class AuthModule {}
