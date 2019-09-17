'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('creador').notNullable()
      table.string('nombretema').notNullable()
      table.string('estilonavbar').notNullable()
      table.string('estilopagina').notNullable()
      table.string('background').notNullable()
      table.string('userbox').notNullable()
      table.string('postbox').notNullable()
      table.integer('precio').notNullable().unsigned().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
