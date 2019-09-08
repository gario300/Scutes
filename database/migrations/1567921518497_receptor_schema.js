'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceptorSchema extends Schema {
  up () {
    this.create('receptors', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('menssage', 300).notNullable()
      table.integer('regalo').defaultTo(0)
      table.boolean('isreaded').defaultTo(false)
    })
  }

  down () {
    this.drop('receptors')
  }
}

module.exports = ReceptorSchema
