import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TaskModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
