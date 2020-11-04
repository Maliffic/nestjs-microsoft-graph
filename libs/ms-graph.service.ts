import { Client, ClientOptions } from '@microsoft/microsoft-graph-client';
import { MicrosoftGraphAuthService } from './ms-graph-auth.service';
import { CLIENT } from './ms-graph.constants';

const MicrosoftGraphService = {
  provide: CLIENT,
  useFactory: async (auth: MicrosoftGraphAuthService) => {
    const clientOptions: ClientOptions = {
      authProvider: auth,
    };
    console.log(clientOptions);
    const client = Client.initWithMiddleware(clientOptions);

    return client;
  },
  inject: [MicrosoftGraphAuthService],
};
export default MicrosoftGraphService;
