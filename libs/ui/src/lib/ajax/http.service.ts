/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { Observable, Observer } from 'rxjs';

// sample url: https://jsonplaceholder.typicode.com/users
interface RequestArgs {
  method: HttpMethod;
  url: string;
  queryParams?: any;
  payload?: any;
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class HttpService {
  private httpClient!: AxiosInstance;
  private cancelTokenSource!: CancelTokenSource;
  private options!: AxiosRequestConfig;
  private completed!: boolean;

  get<T>(url: string, queryParams?: any, options: AxiosRequestConfig = {}): Observable<T> {
    this.setOptions(options);
    return this.executeRequest<T>({ method: HttpMethod.GET, url, queryParams });
  }

  post<T>(url: string, payload: any, options: AxiosRequestConfig = {}): Observable<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.POST,
      url,
      payload,
    });
  }

  put<T>(url: string, payload: any, options: AxiosRequestConfig = {}): Observable<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.PUT,
      url,
      payload,
    });
  }

  patch<T>(url: string, payload: any, options: AxiosRequestConfig = {}): Observable<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.PATCH,
      url,
      payload,
    });
  }

  delete<T>(url: string, options: AxiosRequestConfig = {}): Observable<T> {
    this.setOptions(options);
    return this.executeRequest<T>({
      method: HttpMethod.DELETE,
      url,
    });
  }

  abort(forcely = false): void {
    if (!this.completed || forcely) {
      this.cancelTokenSource.cancel(`${this.options.url} is aborted`);
    }
  }

  private setOptions(options: AxiosRequestConfig = {}): void {
    if (this.options) {
      this.options = { ...this.options, ...options };
    } else {
      this.options = options;
    }
    this.cancelTokenSource = axios.CancelToken.source();
    this.httpClient = axios.create({ ...options, cancelToken: this.cancelTokenSource.token });
    this.completed = false;
  }

  private executeRequest<T>(args: RequestArgs): Observable<T> {
    const { method, url, queryParams, payload } = args;
    let request: AxiosPromise<T>;
    switch (method) {
      case HttpMethod.GET:
        request = this.httpClient.get<T>(url, { params: queryParams });
        break;
      case HttpMethod.POST:
        request = this.httpClient.post<T>(url, payload);
        break;
      case HttpMethod.PUT:
        request = this.httpClient.put<T>(url, payload);
        break;
      case HttpMethod.PATCH:
        request = this.httpClient.patch<T>(url, payload);
        break;
      case HttpMethod.DELETE:
        request = this.httpClient.delete<T>(url);
        break;
    }

    return new Observable<T>((observer: Observer<T>) => {
      request
        .then((response: AxiosResponse) => {
          observer.next(response.data);
        })
        .catch((error: AxiosError | Error) => {
          this.abort();
          observer.error(error);
          if (axios.isAxiosError(error)) {
            console.log(error.code);
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          } else {
            console.log(error.message);
          }
        })
        .finally(() => {
          this.completed = true;
          observer.complete();
        });
      return () => this.abort();
    });
  }
}

export const httpService = new HttpService();
