'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()
      table.integer('userone').references('id').inTable('users').unsigned().notNullable().onDelete('CASCADE')
      table.integer('usertwo').references('id').inTable('users').unsigned().notNullable().onDelete('CASCADE')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
