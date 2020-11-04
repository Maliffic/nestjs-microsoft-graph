import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import {
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { URLSearchParams } from 'url';
import { MS_GRAPH_MODULE_OPTIONS } from './ms-graph.constants';
import { MicrosoftGraphOptions } from './ms-graph.interface';

@Injectable()
export class MicrosoftGraphAuthService implements AuthenticationProvider {
  constructor(
    @Inject(MS_GRAPH_MODULE_OPTIONS)
    private readonly options: MicrosoftGraphOptions,
    private readonly httpService: HttpService,
  ) {}

  async getAccessToken(): Promise<string> {
    const params = new URLSearchParams();

    params.append('grant_type', this.options.grant_type);
    params.append('client_id', this.options.client_id);
    params.append('client_secret', this.options.client_secret);
    params.append('scope', this.options.scope);

    try {
      const response = await this.httpService
        .post(this.options.endpoint, params)
        .toPromise();
      if (!response) {
        throw new HttpException(response, HttpStatus.BAD_REQUEST);
      }

      console.log(response);
      return response.data.access_token;
    } catch (error) {
      throw new Error(error);
    }
  }
}
