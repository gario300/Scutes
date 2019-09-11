'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GoalSchema extends Schema {
  up () {
    this.create('goals', (table) => {
      table.increments()
      table.string('title',100).notNullable()
      table.string('placa').notNullable()
      table.string('description',300).notNullable()
      table.integer('recompensa').notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('goals')
  }
}

module.exports = GoalSchema
