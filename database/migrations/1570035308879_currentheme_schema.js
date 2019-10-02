'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurrenthemeSchema extends Schema {
  up () {
    this.create('currenthemes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('nombretema').notNullable()
      table.string('estilonavbar').notNullable()
      table.string('estiloiconos').notNullable()
      table.string('estilopagina').notNullable()
      table.string('background').notNullable()
      table.string('userbox').notNullable()
      table.string('postbox').notNullable()
      table.string('colortexto').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('currenthemes')
  }
}

module.exports = CurrenthemeSchema
