'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.table('notifications', (table) => {
      table.string('receptor_name').nullable()
    })
  }

  down () {
    this.table('notifications', (table) => {
      // reverse alternations
    })
  }
}

module.exports = NotificationSchema
