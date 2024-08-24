import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './core/global.module';
import { MyDataSource } from '@lib/database/config/database.data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    SystemModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MyDataSource,
      dataSourceFactory: async (options: DataSourceOptions) =>
        await new DataSource(options).initialize(),
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
