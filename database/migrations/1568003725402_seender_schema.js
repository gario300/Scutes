'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeenderSchema extends Schema {
  up () {
    this.create('seenders', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').unsigned().notNullable()
      table.integer('conversation_id').references('id').inTable('conversations').unsigned().notNullable()
      table.integer('receptor_id').unsigned().notNullable()
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
