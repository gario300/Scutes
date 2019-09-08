'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeenderSchema extends Schema {
  up () {
    this.create('seenders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('seenders')
  }
}

module.exports = SeenderSchema
