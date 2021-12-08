import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3001, {
  path: '/websockets',
  serveClient: true,
  namespace: '/',
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server; //webSoketServer
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized Sokket ');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): any {
    this.logger.log(`Client Diconected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    ////client.emit('msgToClient', text); аналог строк нижи но нижке безопасниие
    // return {
    //   data: 'Hello Bogdan',
    //   event: 'msgToClient',
    // };
    this.wss.emit('msgToClient', text);
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
