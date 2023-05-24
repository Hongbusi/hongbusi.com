---
title: 'NestJS 登录功能：基于 JWT 的身份验证'
publishDate: 'May 24 2023'
---

[代码仓库](https://github.com/Hongbusi/learn-nest)

本文将介绍如何使用 `@nestjs/jwt` 来实现身份验证功能，并涵盖以下内容：

- 环境变量配置；
- 连接数据库；
- 从零开始实现注册和登录功能。

在实现完整的身份验证功能之前，我们需要先完成一些前置工作。为了确保你能够跟随本文的步骤并从头开始实现，我将提供一些代码示例。让我们开始吧！

## 创建项目

``` bash
pnpm add @nestjs/cli -g
nest new project-name
```

执行 `pnpm run start:dev` 即可开始编写代码。

## 环境变量配置

在应用运行的时候，某些配置信息可能包含敏感数据，例如数据库密码、API 秘钥等。因此，我们应该将这些敏感信息存储在环境变量中，避免将其硬编码在代码中，以减少意外泄露的风险。现在让我们来配置环境变量。

首先，安装所需的依赖项：

``` bash
pnpm add @nestjs/config
```

安装完成后，我们可以在 `AppModule` 中引入并使用它：

``` ts
// app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { AppController } from './app.controller'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

接下来，创建一个名为 `.env` 的环境变量文件，并将以下内容添加到其中（这里一次性列出了需要使用的环境变量，以方便后续步骤）：

```
# DATABASE
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=test

# JWT
JWT_SECRET=secret
JWT_TOKEN_AUDIENCE=localhost:3000
JWT_TOKEN_ISSUER=localhost:3000
JWT_ACCESS_TOKEN_TTL=3600
```

Nest 支持使用 `Joi` 进行校验，如果未提供所需的环境变量或不符合某些验证规则，将在启动期间抛出异常。

接下来，安装所需的依赖项：

``` bash
pnpm add joi
```

定义一个 Joi 验证模式：

``` ts
// src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { AppService } from './app.service'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().required(),
        JWT_TOKEN_ISSUER: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 连接数据库

在这里我们使用官方推荐的 `TypeORM` 来实现数据库连接，并使用 `MySQL` 作为数据库支持。首先，让我们安装所需的依赖项：

``` bash
pnpm add @nestjs/typeorm typeorm mysql2
```

接下来，我们需要将 `TypeOrmModule` 导入到根模块 `AppModule` 中，并配置数据库连接信息。请确保将以下代码添加到 `app.module.ts` 文件中：

``` ts
// app.module.ts
// ...
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    // ...
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ]
  // ...
})
export class AppModule {}
```

请确保将数据库连接配置与你要连接的实际数据库相匹配。现在，你可以重新执行 `pnpm run start:dev` 来连接到数据库了。

另外，请注意，如果控制台显示报错信息 `Unknown database 'test'`，请检查你要连接的数据库是否已经创建了名为 `test` 的 数据库。以下是你可能在解决此问题中使用到的命令示例：

``` bash
mysql -uroot -p # 进入 MySQL

SHOW DATABASES; # 查看数据库列表
CREATE DATABASE test; # 创建数据库
```

## 使用 JWT 实现身份验证

1. 首先，使用以下命令安装所需的依赖项：

``` bash
pnpm add @nestjs/jwt
```

2. 创建一个名为 `jwt.config.ts` 的配置文件，用于存储 JWT 的配置信息：

``` ts
// config/jwt.config.ts
import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  }
})
```

3. 创建认证模块，包括 `AuthService` 和 `AuthController`。`AuthService` 将负责处理身份验证的逻辑，而 `AuthController` 将用于公开身份验证的接口：

``` bash
nest g module auth
nest g controller auth --no-spec
nest g service auth --no-spec
```

4. 创建用户模块，包括 `UsersService`、`UserController` 和 `User` 实体：

``` bash
nest g module users
nest g controller users --no-spec
nest g service users --no-spec
nest g class users/entities/user.entity --no-spec --flat
```

5. 在 `User` 实体中定义用户的属性，然后在 `UsersModule` 中注册 `User` 实体：

``` ts
// src/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string
}
```

我们可以使用 `forFeature()` 方法来定义在当前范围内注册了哪些存储库。借助该方法，我们可以通过 `@InjectRepository()` 装饰器将 `UsersRepository` 注入到` UsersService` 中。

``` ts
// src/users/users.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

6. 在 `UsersController` 中添加一个 `findAll` 接口，用于查询用户列表：

``` ts
// src/users/users.controller.ts
import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }
}
```

7. 完善 `UsersService` 的功能，使其能够使用 `userRepository` 查询用户列表：

``` ts
// src/users/users.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
```

8. 在 `AuthModule` 中注册 `UserRepository` 以及 `JwtModule`：

``` ts
// src/auth/auth.module.ts
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { User } from 'src/users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import jwtConfig from '../config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}
```

9. 定义 `SignInDto` 和 `SignUpDto` 属性，然后在 `AuthController` 中定义注册和登录接口：


``` ts
// src/auth/dto/sign-in.dto.ts
export class SignInDto {
  readonly name: string
  readonly password: string
}
```

``` ts
// src/auth/dto/sign-up.dto.ts
export class SignUpDto {
  readonly name: string
  readonly password: string
}
```

``` ts
// src/auth/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
```

10. 注入 `AuthService` 中需要用到的模块：

``` ts
// src/auth/auth.service.ts
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import jwtConfig from '../config/jwt.config'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // TODO sign up
  }

  async signIn(signInDto: SignInDto) {
    // TODO sign in
  }
}
```

11. 实现注册功能：

``` ts
// ...
import { UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthService {
  // ...

  async signUp(signUpDto: SignUpDto) {
    const { name, password } = signUpDto

    const existingUser = await this.userRepository.findOne({ where: [{ name }] })
    if (existingUser)
      throw new UnauthorizedException('User already exists')

    const user = this.userRepository.create(signUpDto)
    return this.userRepository.save(user)
  }

  // ...
}
```
![Nestjs - before encryption](/images/nestjs-before-encryption.png)

这个时候就可以成功注册用户了。但是可以发现，此时的密码是明文保存在数据库中的。

12. 在 `auth` 下生成一个 `HashingService`，我们将使用 `HashingService` 来实现密码加密、对比的逻辑：

``` bash
nest g service auth/hashing --no-spec --flat
```

安装所需依赖：

``` bash
pnpm add bcrypt
pnpm add @types/bcrypt -D
```

替换 `hashing.service.ts` 内容：

``` ts
// src/auth/hashing.service.ts
import { Buffer } from 'node:buffer'
import { Injectable } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

@Injectable()
export class HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt()
    return hash(data, salt)
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted)
  }
}
```

13. 在 `AuthService` 中新建用户的时候，对 `password` 使用 `HashingService` 提供的 `hash` 方法，实现密码加密：

``` ts
// src/auth/auth.service.ts
// ...
import { HashingService } from './hashing.service' // +

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    // ...
    private readonly hashingService: HashingService, // +
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, password } = signUpDto

    const existingUser = await this.userRepository.findOne({ where: [{ name }] })
    if (existingUser)
      throw new UnauthorizedException('User already exists')

    const hashedPassword = await this.hashingService.hash(password) // +
    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    }) // +
    return this.userRepository.save(user)
  }
}
```

![Nestjs - after encryption](/images/nestjs-after-encryption.png)

这样我们在新建用户的时候，保存到数据库的密码就是加密之后的了。

14. 定义一个 `ActiveUserData` 类型，然后实现登录功能：

在这个步骤中，我们需要定义一个名为 `ActiveUserData` 的接口，用于表示活动用户的数据。接口的属性包括 `sub`（用户ID）和 `name`（用户名）。

``` ts
// src/auth/interfaces/active-user-data.interface.ts
export interface ActiveUserData {
  sub: number
  name: string
}
```

在 `AuthService` 类中实现登录功能。在 `signIn` 方法中，我们首先从 `signInDto` 中解构出 `name` 和 `password`。然后，我们通过用户名查询数据库，如果用户不存在，则抛出未经授权的异常。接下来，我们使用 `hashingService` 的 `compare` 方法比较密码的哈希值，如果不匹配，则抛出未经授权的异常。最后，我们调用 `generateTokens` 方法生成令牌。

``` ts
// ...

@Injectable()
export class AuthService {
  // ...

  async signIn(signInDto: SignInDto) {
    const { name, password } = signInDto

    const user = await this.userRepository.findOne({ where: { name } })
    if (!user)
      throw new UnauthorizedException('User not found')

    const isEqual = await this.hashingService.compare(password, user.password)
    if (!isEqual)
      throw new UnauthorizedException('Password is incorrect')

    return await this.generateTokens(user)
  }
  // ...
}
```

接下来，我们实现 `generateTokens` 方法来生成令牌。在该方法中，我们使用 `signToken` 方法为用户生成令牌，并将令牌包装在对象中返回。

``` ts
// ...
import { ActiveUserData } from './interfaces/active-user-data.interface'

@Injectable()
export class AuthService {
  // ...

  async generateTokens(user: User) {
    const token = await this.signToken<Partial<ActiveUserData>>(user.id, { name: user.name })
    return { token }
  }

  private async signToken<T>(userId: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    )
  }
  // ...
}
```

15. 接下来，我们需要实现一个守卫来验证令牌的有效性。我们将创建一个名为 `AccessTokenGuard` 的守卫，并实现其 `CanActivate` 接口。在 `canActivate` 方法中，我们从请求中提取令牌，并验证其有效性。如果令牌无效或不存在，我们将抛出未经授权的异常。如果令牌有效，我们将解码的用户数据存储在请求对象中的 `REQUEST_USER_KEY` 键下。

``` bash
nest g guard access-token auth/guards --no-spec --flat
```

``` ts
// src/constants/index.ts
export const REQUEST_USER_KEY = 'user'
```

``` ts
// src/auth/guards/access-token.guard.ts
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { REQUEST_USER_KEY } from '../../constants'
import jwtConfig from '../../config/jwt.config'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token)
      throw new UnauthorizedException()

    try {
      const payload = this.jwtService.verifyAsync(token, this.jwtConfiguration)
      request[REQUEST_USER_KEY] = payload
    }
    catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? []
    return token
  }
}
```

16. 为了允许某些接口不需要提供令牌，我们可以使用装饰器 `@Public` 标记这些接口。我们首先创建一个名为 `IS_PUBLIC_KEY` 的常量来定义元数据键，然后定义 `Public` 装饰器来设置该元数据。

``` ts
// src/common/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
```

在 AccessTokenGuard 中判断一下：

``` ts
// src/auth/guards/access-token.guard.ts
// ...
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  // ...

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic)
      return true

    // ...
  }
}
```

17. 现在，我们可以在需要公开访问的控制器方法上使用 `@Public` 装饰器：

``` ts
// src/auth/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Public } from '../common/decorators/public.decorator' // +
import { SignInDto } from './dto/sign-in.dto'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // +
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Public() // +
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
```

18. 最后，我们需要在 `AuthModule` 中全局使用 `AccessTokenGuard` 守卫：

``` ts
// src/auth/auth.module.ts
// ...
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './guards/access-token.guard'

@Module({
  // ....
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  // ...
})
export class AuthModule {}
```

![Nestjs - no token](/images/nestjs-no-token.png)
![Nestjs - sign in](/images/nestjs-sign-in.png)
![Nestjs - token](/images/nestjs-token.png)

如上，我们成功实现了登录功能，并添加了令牌验证的守卫。登录接口需要提供有效的令牌才能访问，而注册接口和其他公开接口则不需要令牌。

## 写在最后

以上便是本文的全部内容。希望这篇文章对你有所帮助，并由衷感谢你的阅读。如果在文中存在不准确或不清晰之处，欢迎大家指正和补充，让我们共同进步、相互学习。
