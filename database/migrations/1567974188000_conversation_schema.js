'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()
      table.integer('from_user_id').unsigned().references('id').inTable('users')
      table.integer('to_user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
