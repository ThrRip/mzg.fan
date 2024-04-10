/*
 * Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default defineAppConfig({
  appHomeBase: 'https://mzg.fan/',
  appHomeBiliUid: '391500490',
  appHomeBiliRoomId: '32452928',

  appAdminBasePath: '/admin',

  backendBase: 'https://api.mzg.fan/v1',
  backendProjectId: '649758e1eb1fa584a04d',
  backendQueryResultsLimit: 1000,

  biliApiRoomPlayInfoEndpoint: 'https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo',

  monitoringDataCollectorUserAgentMatch: /^Zabbix$/
})
