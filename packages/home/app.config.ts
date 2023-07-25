export default defineAppConfig({
  backendBase: 'https://api.mzg.fan/v1',
  backendProjectId: '649758e1eb1fa584a04d',

  biliApiRoomPlayInfoEndpoint: 'https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo',
  biliApiRoomPlayInfoEndpointQueries: { room_id: '1267105' }
})
