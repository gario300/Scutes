'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeenderSchema extends Schema {
  up () {
    this.create('seenders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('conversation_id').unsigned().references('id').inTable('conversations').onDelete('CASCADE')
      table.string('mensaje',300).notNullable()
      table.integer('regalo').defaultTo(0)
      table.boolean('is_readed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('seenders')
  }
}

module.exports = SeenderSchema
