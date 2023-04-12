import { PaginationModel } from './pagination.model';

export interface ResponseModel {
  pagination: PaginationModel;
  data: any[];
}
