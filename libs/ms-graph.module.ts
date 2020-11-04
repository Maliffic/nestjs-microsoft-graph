import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { MicrosoftGraphAuthService } from './ms-graph-auth.service';
import { MS_GRAPH_MODULE_OPTIONS } from './ms-graph.constants';
import { MicrosoftGraphOptions } from './ms-graph.interface';
import MicrosoftGraphService from './ms-graph.service';

interface MicrosoftGraphModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: any;
  inject?: any;
}

const CLIENT = [MicrosoftGraphService, MicrosoftGraphAuthService];

@Module({
  providers: [...CLIENT],
  exports: [...CLIENT],
})
export class MicrosoftGraphModule {
  static withConfig(options: MicrosoftGraphOptions): DynamicModule {
    return {
      module: MicrosoftGraphModule,
      providers: [
        {
          provide: MS_GRAPH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static withConfigAsync(
    options: MicrosoftGraphModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: MicrosoftGraphModule,
      imports: options.imports || [],
      providers: [
        {
          provide: MS_GRAPH_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
    };
  }
}
