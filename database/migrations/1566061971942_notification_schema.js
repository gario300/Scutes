'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('sender_id').unsigned().references('id').inTable('senders')
      table.integer('receptor_id').unsigned().references('id').inTable('receptors')
      table.boolean('is_readed').defaultTo(false)
    table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
