'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').nullable().unsigned().references('id').inTable('users')
      table.integer('receptor').nullable().unsigned().references('id').inTable('users')
      table.integer('post_id').nullable().unsigned().references('id').inTable('posts')
      table.integer('notification_type')
      table.boolean('is_readed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
