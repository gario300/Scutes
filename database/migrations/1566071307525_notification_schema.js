'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').nullable().unsigned().references('id').inTable('users')
      .onDelete('CASCADE')
      table.integer('receptor_id').nullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('post_id').nullable().unsigned().references('id').inTable('posts').onDelete('CASCADE')
      table.string('notification_type')
      table.boolean('is_readed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
