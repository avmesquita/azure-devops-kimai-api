import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureDevopsModule } from './azure-devops/azure-devops.module';
import { KimaiModule } from './kimai/kimai.module';
import { IntegrationService } from './integration/integration.service';

@Module({
  imports: [AzureDevopsModule, KimaiModule],
  controllers: [AppController],
  providers: [AppService, IntegrationService],
})
export class AppModule {}
