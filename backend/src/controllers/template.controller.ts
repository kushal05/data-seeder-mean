import {get, param, Response, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import * as fs from 'fs';
import * as path from 'path';

export class TemplateController {
  constructor() {}

  private generateCSV(step: number): string {
    let filePath = '';
    switch (step) {
      case 1:
        filePath = path.join(__dirname, '../templates/users.csv');
        break;
      case 2:
        filePath = path.join(__dirname, '../templates/plots.csv');
        break;
      case 3:
        filePath = path.join(__dirname, '../templates/invoices.csv');
        break;
      default:
        throw new Error('Invalid step number');
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  @get('/api/templates/download/{step}', {
    responses: {
      '200': {
        description: 'CSV template',
        content: {'text/csv': {}},
      },
    },
  })
  async downloadTemplate(
    @param.path.number('step') step: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {
    try {
      const csvContent = this.generateCSV(step);
      
      response.setHeader('Content-Type', 'text/csv');
      response.setHeader(
        'Content-Disposition',
        `attachment; filename=template-step-${step}.csv`,
      );
      response.send(csvContent);
    } catch (error) {
      throw new Error(`Failed to generate template: ${error.message}`);
    }
  }
} 