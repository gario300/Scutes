'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()
      table.integer('seender_id').notNullable().unsigned().references('id').inTable('seenders').onDelete('CASCADE')
      table.integer('receptor_id').notNullable().unsigned().references('id').inTable('receptors').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
