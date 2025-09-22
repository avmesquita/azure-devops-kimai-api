// src/azure-devops/azure-devops.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureDevopsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWorkItems(query: string): Promise<any> {
    const pat = this.configService.get<string>('AZURE_DEVOPS_PAT');
    const organization = this.configService.get<string>('AZURE_DEVOPS_ORG');
    const project = this.configService.get<string>('AZURE_DEVOPS_PROJECT');
    
    // Autenticação com PAT
    const authHeader = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
    
    // Requisição para a API REST
    const url = `https://dev.azure.com/${organization}/${project}/_apis/wit/wiql?api-version=7.1`;
    
    try {
      const response = await this.httpService.post(url, { query }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      }).toPromise();
      
      const workItemIds = response?.data.workItems.map(item => item.id);
      
      // Detalhes dos Work Items
      const detailsUrl = `https://dev.azure.com/${organization}/${project}/_apis/wit/workitemsbatch?api-version=7.1`;      
      const detailsResponse = await this.httpService.post(detailsUrl, {
        ids: workItemIds,
        fields: ['System.Id', 'System.Title', 'System.WorkItemType', 'System.AssignedTo', 'Microsoft.VSTS.Scheduling.CompletedWork'] // Exemplo de campos que você pode precisar
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      }).toPromise();

      if (detailsResponse)      
        return detailsResponse.data;
      else
        return null;
      
    } catch (error) {
      // Tratar erros
      console.error('Erro ao buscar Work Items do Azure DevOps:', error.message);
      throw new Error('Falha ao buscar dados do Azure DevOps.');
    }
  }
}