'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IntergoalSchema extends Schema {
  up () {
    this.create('intergoals', (table) => {
      table.increments()
      table.integer('goal_id').notNullable().unsigned()
      table.boolean('is_readed').defaultTo(false).notNullable()
      table.integer('user_id').notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('intergoals')
  }
}

module.exports = IntergoalSchema
