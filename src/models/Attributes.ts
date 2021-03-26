export class Attributes<T> {
  constructor(private data: T) {}

  public get = <K extends keyof T>(propName: K): T[K] => {
    return this.data[propName];
  };

  public set = (update: T): void => {
    this.data = Object.assign({}, this.data, { ...update });
  };

  public getAll = (): T => {
    return this.data;
  };
}
