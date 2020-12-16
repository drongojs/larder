import { Stock } from 'domain/core';
import jpex from 'jpex';
import { Driver } from 'ports/driver';
import { RestEntity, IEntity } from '../entity';

export interface IStockService extends IEntity<Stock> {
  search(args: { search: string }): Promise<Array<Stock>>,
}

class StockService extends RestEntity<Stock> implements IStockService {
  constructor(driver: Driver) {
    super(driver, '/api/stock/item');
  }

  search({ search }: { search: string }) {
    return this.driver<Stock[]>({
      url: '/api/stock/items',
      data: { q: search },
    });
  }
}

jpex.service(StockService);
