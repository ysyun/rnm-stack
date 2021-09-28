import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices/client";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ConfigurationService {
  constructor(@Inject("CONFIGURATION") private readonly client: ClientProxy) { }

  sum(): Observable<{ message: number, duration: number }> {
    const startTs = Date.now();
    const pattern = { cmd: 'configuration-sum' };
    const payload = [1, 2, 3];
    return this.client
      .send<number>(pattern, payload)
      .pipe(
        map((message: number) => ({ message, duration: Date.now() - startTs }))
      );
  }
}
