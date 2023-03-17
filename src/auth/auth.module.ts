import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}


通过@UseGuards(AuthGuard('local'))，我们正在使用@nestjs/passporta在我们扩展passport-local策略时为我们自动提供的AuthGuard。让我们来分析一下。我们的Passport本地策略有一个默认的名字 "local"。我们在@UseGuards()装饰器中引用该名称，以便将其与passport-local包提供的代码联系起来。如果我们的应用程序中有多个Passport策略（每个策略都可能提供一个特定于策略的AuthGuard），这将被用来区分调用哪个策略。虽然到目前为止我们只有一个这样的策略，但我们很快就会添加第二个，所以需要这个来区分。

为了测试我们的路由，我们将让我们的/auth/login路由暂时简单地返回用户。这也让我们展示Passport的另一个功能。Passport根据我们从validate()方法返回的值自动创建一个用户对象，并将其作为req.user分配给Request对象。稍后，我们将用创建和返回JWT的代码来取代它。

由于这些是API路由，我们将使用常用的cURL库来测试它们。你可以用UsersService中硬编码的任何用户对象进行测试。