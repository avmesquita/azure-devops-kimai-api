// src/integration/integration.service.ts
import { Injectable } from '@nestjs/common';
import { AzureDevopsService } from '../azure-devops/azure-devops.service';
import { KimaiService } from '../kimai/kimai.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly azureDevopsService: AzureDevopsService,
    private readonly kimaiService: KimaiService,
  ) {}

  async syncWorkItemsToKimai(query: string): Promise<any> {
    // 1. Obter Work Items do Azure DevOps
    const workItems = await this.azureDevopsService.getWorkItems(query);
    
    // 2. Iterar sobre os Work Items e criar entradas no Kimai
    for (const item of workItems.value) {
      // Lógica para mapear os dados do Azure DevOps para o formato do Kimai
      // Exemplo: mapear WorkItem para Timesheet
      const timeEntryData = {
        project: 'ID_DO_PROJETO_NO_KIMAI', 
        activity: 'ID_DA_ATIVIDADE_NO_KIMAI',
        begin: 'DATA_E_HORA_DE_INICIO',
        end: 'DATA_E_HORA_DE_FIM',
        description: `Azure DevOps: #${item.id} - ${item.fields['System.Title']}`,
      };
      
      // 3. Chamar a API do Kimai para criar a entrada
      await this.kimaiService.createTimeEntry(timeEntryData);
    }
    
    return { message: 'Sincronização concluída com sucesso.' };
  }
}