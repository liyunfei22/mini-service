# Nestjs web服务

## 中间件

### 类中间件

中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。 next() 中间件函数通常由名为 next 的变量表示。

您可以在函数中或在具有 @Injectable() 装饰器的类中实现自定义 Nest中间件。 这个类应该实现 NestMiddleware 接口, 而函数没有任何特殊的要求。

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

```

中间件不能在 @Module() 装饰器中列出。我们必须使用模块类的 configure() 方法来设置它们。包含中间件的模块必须实现 NestModule 接口。我们将 LoggerMiddleware 设置在 ApplicationModule 层上。

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}

```

我们还可以在配置中间件时将包含路由路径的对象和请求方法传递给forRoutes()方法

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

路由通配符

```typescript
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });

```

中间件消费者 MiddlewareConsumer 是一个帮助类。它提供了几种内置方法来管理中间件

### 函数式中间件

### 全局中间件
## 异常过滤器 
每个发生的异常都由全局异常过滤器处理, 当这个异常无法被识别时用户将收到以下 JSON 响应
```typescript
{
    "statusCode": 500,
    "message": "Internal server error"
}

```
### 基础异常类 HttpException
Nest提供了一个内置的 `HttpException` 类，它从 @nestjs/common 包中导入
```typescript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```
HttpException 构造函数有两个必要的参数来决定响应:

- response 参数定义 JSON 响应体。它可以是 string 或 object，如下所述。

- status参数定义HTTP状态代码。status-是有效的 HTTP 状态代码。 最佳实践是使用从@nestjs/common导入的 HttpStatus枚举。
```typescript

@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```
### 自定义异常
### 异常过滤器
虽然基本（内置）异常过滤器可以为您自动处理许多情况，但有时您可能希望对异常层拥有完全控制权，例如，您可能希望基于某些动态因素添加日志记录或使用不同的 JSON 模式。 异常过滤器正是为此目的而设计的。 它们使您可以控制精确的控制流以及将响应的内容发送回客户端。

|UnauthorizedException| 401 |
| ------------- |:-------------:|
|BadRequestException| 404 |
|NotFoundException| 404 |
|ForbiddenException| 403 |
|RequestTimeoutException| 408 |
|NotAcceptableException| 406 |
|ConflictException| 409 |
|GoneException| 410 |
|PayloadTooLargeException| 413 |
|UnsupportedMediaTypeException| 415 |
|UnprocessableException|  |
|InternalServerErrorException| 500 |
|NotImplementedException| 501 |
|BadGatewayException| 502 |
|ServiceUnavailableException| 410 |
|GatewayTimeoutException| 410 |
## TypeOrm

TypeORM 是一个ORM框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用

### entity

实体是一个映射到数据库表（或使用 MongoDB 时的集合）的类。基本实体由列和关系组成。 每个实体必须有一个主列

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
```

### Entity columns

#### 主键 column

Each entity must have at least one primary column

```typescript
import { Entity, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    id: number
}
// @PrimaryGeneratedColumn() creates a primary column which value will be automatically generated with an auto-increment value.
// It will create int column
import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
}
// @PrimaryGeneratedColumn("uuid") creates a primary column which value will be automatically generated with uuid.
import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
}
```

#### 特殊的 columns

```typescript
`@CreateDateColumn` is a special column that is automatically set to the entity's insertion date. You don't need to set this column - it will be automatically set.

`@UpdateDateColumn` is a special column that is automatically set to the entity's update time each time you call save of entity manager or repository. You don't need to set this column - it will be automatically set.

`@DeleteDateColumn` is a special column that is automatically set to the entity's delete time each time you call soft-delete of entity manager or repository. You don't need to set this column - it will be automatically set. If the @DeleteDateColumn is set, the default scope will be "non-deleted".

`@VersionColumn` is a special column that is automatically set to the version of the entity (incremental number) each time you call save of entity manager or repository. You don't need to set this column - it will be automatically set.
```

#### 空间列

暂时不看

### column 类型

TypeORM supports all of the most commonly used database-supported column types.

```typescript
@Column("int")
@Column({ type: "int" })
// column options
@Column("varchar", { length: 200 })
// or
@Column({ type: "int", width: 200 })

```

Column types for mysql

```
bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year, char, nchar, national char, varchar, nvarchar, national varchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary, varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection
```

#### 枚举列类型

```typescript
export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role: UserRole
}
```

```typescript

export type UserRoleType = "admin" | "editor" | "ghost",

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ["admin", "editor", "ghost"],
        default: "ghost"
    })
    role: UserRoleType
}
```

#### set类型的column

#### simple-array类型的column

有一种称为简单数组的特殊列类型，它可以将原始数组值存储在单个字符串列中

```typescript
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("simple-array")
    names: string[]
}
const user = new User()
user.names = ["Alexander", "Alex", "Sasha", "Shurik"]
```

#### simple-json类型的column

有一种称为 simple-json 的特殊列类型，它可以存储任何可以通过 JSON.stringify 存储在数据库中的值

```typescript
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("simple-json")
    profile: { name: string; nickname: string }
}
const user = new User()
user.profile = { name: "John", nickname: "Malkovich" }
```

#### Columns with generated values

您可以使用 @Generated 装饰器创建具有生成值的列

```typescript

@Entity()
export class User {
    @PrimaryColumn()
    id: number

    @Column()
    @Generated("uuid")
    uuid: string
}
```

#### Column options

列选项为您的实体列定义附加选项

```
@Column({
    type: "varchar",
    length: 150,
    unique: true,
    // ...
})
name: string;
```
类型选项参考
ColumnOptions中可用选项列表：

type: ColumnType - 列类型。其中之一在上面.

name: string - 数据库表中的列名。
默认情况下，列名称是从属性的名称生成的。 你也可以通过指定自己的名称来更改它。

length: number - 列类型的长度。 例如，如果要创建varchar（150）类型，请指定列类型和长度选项。

width: number - 列类型的显示范围。 仅用于MySQL integer types

onUpdate: string - ON UPDATE触发器。 仅用于 MySQL.

nullable: boolean - 在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false。

update: boolean - 指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"。

select: boolean - 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true

default: string - 添加数据库级列的DEFAULT值。

primary: boolean - 将列标记为主要列。 使用方式和@ PrimaryColumn相同。

unique: boolean - 将列标记为唯一列（创建唯一约束）。

comment: string - 数据库列备注，并非所有数据库类型都支持。

precision: number - 十进制（精确数字）列的精度（仅适用于十进制列），这是为值存储的最大位数。仅用于某些列类型。

scale: number - 十进制（精确数字）列的比例（仅适用于十进制列），表示小数点右侧的位数，且不得大于精度。 仅用于某些列类型。

zerofill: boolean - 将ZEROFILL属性设置为数字列。 仅在 MySQL 中使用。 如果是true，MySQL 会自动将UNSIGNED属性添加到此列。

unsigned: boolean - 将UNSIGNED属性设置为数字列。 仅在 MySQL 中使用。

charset: string - 定义列字符集。 并非所有数据库类型都支持。

collation: string - 定义列排序规则。

enum: string[]|AnyEnum - 在enum列类型中使用，以指定允许的枚举值列表。 你也可以指定数组或指定枚举类。

asExpression: string - 生成的列表达式。 仅在MySQL中使用。

generatedType: "VIRTUAL"|"STORED" - 生成的列类型。 仅在MySQL中使用。

hstoreType: "object"|"string" -返回HSTORE列类型。 以字符串或对象的形式返回值。 仅在Postgres>)中使用。

array: boolean - 用于可以是数组的 postgres 列类型（例如 int []）

transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType } - 用于将任意类型
EntityType的属性编组为数据库支持的类型DatabaseType。
注意：大多数列选项都是特定于 RDBMS 的，并且在MongoDB中不可用。
### 实体继承
## 用户表设计

|字段| 类型| 键| 为空| 默认| 备注|
|---|---|---|---|---|--|
|id |int| PRI| no|  用户唯一索引|
|name |varchar | |no | 用户昵称|
|avatar_url |varchar|  |yes|  头像地址|
|phone |varchar| |UNI |yes|  手机号|
|password| varchar | |yes|  密码|
|created_at |timestamp|  |no | 创建时间|
|updated_at |timestamp|  |yes|  更新时间|

## 参考

[nestjs](https://docs.nestjs.cn/9/introduction)
[typeOrm](https://typeorm.io/)
[typeOrm中文文档](https://typeorm.bootcss.com/)
[韩顺平 mysql](https://blog.csdn.net/LW_20180806/article/details/124536815)


1.建项目
2.curd
3.typeORM
4.中间件
4.user接口
5.异常处理
6.统一数据: 异常处理 、拦截器、管道
7.空值校验
