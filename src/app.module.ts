import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { BeefModule } from './beef/beef.module';
import { FeedModule } from './feed/feed.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'db_min_cal',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostsModule,
    BeefModule,
    FeedModule,
    UserModule,
  ],
})
export class AppModule {}
