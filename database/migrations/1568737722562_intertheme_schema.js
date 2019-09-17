'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterthemeSchema extends Schema {
  up () {
    this.create('interthemes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('theme_id').unsigned().references('id').inTable('themes').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('interthemes')
  }
}

module.exports = InterthemeSchema
