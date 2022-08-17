export const socketApis = {
  STANDBY: (room) => `/api/auction/standby/${room}`,
  ROOM_CREATION: '/api/chat/room/auction',
  AUCTION_START: '/api/auction/notice',
  CHATROOM_CREATEION: '/api/chat/room/one',
  CHATRROM_ENTRENCE: '/api/chat/room/enter',
  CHAT_SEND: '/api/chat/message',
  CHAT_HISTORY: '/api/chat/history',
  CHAT_ROOMS: '/api/chat/rooms',
};
