import { Module } from '@nestjs/common';
import { KimaiService } from './kimai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  providers: [KimaiService]
})
export class KimaiModule {}
