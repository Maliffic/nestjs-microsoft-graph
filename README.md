## Description

[Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview?view=graph-rest-1.0) module for [Nest](https://github.com/nestjs/nest) framework (node.js)

## Before Installation

TBD

## Configuration

TBD

Import the `MicrosoftGraphModule` with the following configuration:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicrosoftGraphModule } from 'ms-graph.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MicrosoftGraphModule.withConfig({
      grant_type: '**',
      client_id: '**',
      client_secret: '**',
      scope: '**',
      endpoint:
        'https://login.microsoftonline.com/{tenantID}/oauth2/v2.0/token',
    }),
  ],
})
export class AppModule {}
```
