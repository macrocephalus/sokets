import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized Sokket ');
  }

  handleConnection(client: Socket, ...args): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client Diconected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    //client.emit('msgToClient', text); аналог строк нижи но нижке безопасниие
    return {
      data: 'Hello Bogdan',
      event: 'msgToClient',
    };
  }
}

//Будет возвращатись  только клиету который отправил
// @SubscribeMessage('msgToServer')
// handleMessage(client: Socket, text: string): WsResponse<string> {
//   //client.emit('msgToClient', text); аналог строк нижи но нижке безопасниие
//   return {
//     data: 'Hello Bogdan',
//     event: 'msgToClient',
//   };
// }
// }
