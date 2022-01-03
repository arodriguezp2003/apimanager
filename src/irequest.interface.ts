export interface IRequest<T> {
  statusCode: number;
  message?: string;
  error?: string;
  payload: T;
}
