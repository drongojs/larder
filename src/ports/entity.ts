/* eslint-disable @typescript-eslint/no-unused-vars */
import { Driver } from 'ports/driver';

class NotImplementedError extends Error {
  constructor() {
    super('Not Implemented');
  }
}

export interface Model<T> {
  id: T,
}

export interface IEntity<T extends Model<any>> {
  read(args: Pick<T, 'id'>): Promise<T>,
  create(args: Partial<Omit<T, 'id'>>): Promise<T>,
  update(args: Partial<T>): Promise<T>,
  delete(args: Pick<T, 'id'>): Promise<void>,
}

export abstract class Entity<T extends Model<any>> implements IEntity<T> {
  read(args: any): Promise<T> {
    throw new NotImplementedError();
  }
  create(args: any): Promise<T> {
    throw new NotImplementedError();
  }
  update(args: any): Promise<T> {
    throw new NotImplementedError();
  }
  delete(args: any): Promise<void> {
    throw new NotImplementedError();
  }
}

export abstract class RestEntity<T extends Model<any>> implements IEntity<T> {
  driver: Driver;
  baseUrl: string;

  constructor(driver: Driver, baseUrl: string) {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  read({ id }: Pick<T, 'id'>): Promise<T> {
    return this.driver<T>({
      url: `${this.baseUrl}/:id`,
      params: { id },
    });
  }
  create(data: Partial<Omit<T, 'id'>>): Promise<T> {
    return this.driver<T>({
      url: this.baseUrl,
      method: 'POST',
      data,
    });
  }
  update({ id, ...data }: Partial<T>): Promise<T> {
    return this.driver<T>({
      url: `${this.baseUrl}/:id`,
      params: { id },
      method: 'PATCH',
      data,
    });
  }
  delete({ id }: Pick<T, 'id'>): Promise<void> {
    return this.driver<void>({
      url: `${this.baseUrl}/:id`,
      params: { id },
      method: 'DELETE',
    });
  }
}
