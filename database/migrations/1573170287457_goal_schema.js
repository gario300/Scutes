'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GoalSchema extends Schema {
  up () {
    this.create('goals', (table) => {
      table.increments()
      table.string('nombregoal',300).notNullable()
      table.string('description',300).notNullable()
      table.integer('recompensa').unsigned().notNullable()
      table.boolean('is_readed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('goals')
  }
}

module.exports = GoalSchema
