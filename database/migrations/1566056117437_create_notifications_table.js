'use strict'

const Schema = use('Schema')

class NotificationsTableSchema extends Schema {

  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.string('type').nullable()
      table.integer('notifiable_id').unsigned().nullable()
      table.string('notifiable_type').nullable()
      table.jsonb('data').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }

}

module.exports = NotificationsTableSchema
