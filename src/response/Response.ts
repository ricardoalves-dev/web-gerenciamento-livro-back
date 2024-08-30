export class Response<T extends object> {
  data: T | object;
  errors: string[];
  count: number;

  constructor() {
    this.data = {};
    this.count = 0;
    this.errors = [];
  }

  setData(data: T) {
    this.data = data;
    this.count = Array.isArray(data)
      ? data.length
      : Object.keys(this.data).length === 0
        ? 0
        : 1;
  }

  setErrors(errors: string | string[]) {
    if (Array.isArray(errors)) {
      this.errors = errors;
      return;
    }

    this.errors.push(errors);
  }
}
