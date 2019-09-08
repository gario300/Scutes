'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceptorSchema extends Schema {
  up () {
    this.create('receptors', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('receptors')
  }
}

module.exports = ReceptorSchema
