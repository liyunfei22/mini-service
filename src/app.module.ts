import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TestModule } from './test/test.module';
@Module({
  imports: [AuthModule, UsersModule, TestModule],
})
export class AppModule {}
