'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeenderSchema extends Schema {
  up () {
    this.create('seenders', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('menssage', 300).notNullable()
      table.integer('regalo').defaultTo(0)
      table.boolean('isreaded').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('seenders')
  }
}

module.exports = SeenderSchema
