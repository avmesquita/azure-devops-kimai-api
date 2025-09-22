import { Module } from '@nestjs/common';
import { AzureDevopsService } from './azure-devops.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  providers: [AzureDevopsService]
})
export class AzureDevopsModule {}
