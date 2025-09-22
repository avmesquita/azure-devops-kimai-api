// src/kimai/kimai.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KimaiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createTimeEntry(timeEntryData: any): Promise<any> {
    const kimaiUrl = this.configService.get<string>('KIMAI_API_URL');
    const apiToken = this.configService.get<string>('KIMAI_API_TOKEN');
    const apiUser = this.configService.get<string>('KIMAI_API_USER');

    const headers = {
      'X-AUTH-USER': apiUser,
      'X-AUTH-TOKEN': apiToken,
      'Content-Type': 'application/json',
    };
    
    // Exemplo de dados para a entrada de tempo no Kimai
    const payload = {
      project: timeEntryData.project,
      activity: timeEntryData.activity,
      begin: timeEntryData.begin,
      end: timeEntryData.end,
      description: timeEntryData.description,
      // outros campos necessários...
    };

    try {
      const response = await this.httpService.post(`${kimaiUrl}/timesheets`, payload, { headers }).toPromise();
      return response?.data;
    } catch (error) {
      console.error('Erro ao criar entrada de tempo no Kimai:', error.message);
      throw new Error('Falha ao criar entrada de tempo no Kimai.');
    }
  }
}