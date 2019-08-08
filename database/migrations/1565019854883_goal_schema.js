'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GoalsSchema extends Schema {
  up () {
    this.create('goals', (table) => {
      table.increments()
      table.string('title',100).notNullable()
      table.string('description',300).notNullable()
      table.integer('recompensa').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('goals')
  }
}

module.exports = GoalsSchema
