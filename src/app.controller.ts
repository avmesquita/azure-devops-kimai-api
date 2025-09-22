import { Controller, Get, Param } from '@nestjs/common';
import { IntegrationService } from './integration/integration.service';

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService
  ) {}

  @Get('integrate')
  async Integrate(@Param('queryString') queryString: string) {
    return await this.integrationService.syncWorkItemsToKimai(queryString);
  }

}
