'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class 2SeenderSchema extends Schema {
  up () {
    this.create('2_seenders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('2_seenders')
  }
}

module.exports = 2SeenderSchema
