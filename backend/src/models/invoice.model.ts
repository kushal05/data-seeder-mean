import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plot} from './plot.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Plot)
  plotId: string;

  @property({
    type: 'string',
    required: true,
  })
  invoiceName: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedAt?: Date;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
} 