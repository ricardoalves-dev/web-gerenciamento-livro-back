export class AppResponse<T extends object> {
  data: T | {};
  errors: string[];
  count: number;

  constructor() {
    this.data = {};
    this.count = 0;
    this.errors = [];
  }

  setData(data: T) {
    this.data = data;
    this.count = Array.isArray(data) ? data.length : (Object.keys(data).length === 0 ? 0 : 1);
  }

  getErrors(): string[] {
    return this.errors;
  }
}