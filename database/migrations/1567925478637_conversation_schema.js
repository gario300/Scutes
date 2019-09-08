'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').unsigned().notNullable()
      table.integer('receptor_id').notNullable()
      table.integer('receptor_username').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
