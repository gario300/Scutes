'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')
const cluster = require('cluster')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .wsServer()
  .catch(console.error)

  if (cluster.isMaster) {
    for (let i=0; i < 4; i ++) {
      cluster.fork()
    }
    require('@adonisjs/websocket/clusterPubSub')()
    return
  }