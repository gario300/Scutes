'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IntergoalSchema extends Schema {
  up () {
    this.create('intergoals', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('goal_id').unsigned().references('id').inTable('goals')
      table.timestamps()
    })
  }

  down () {
    this.drop('intergoals')
  }
}

module.exports = IntergoalSchema
