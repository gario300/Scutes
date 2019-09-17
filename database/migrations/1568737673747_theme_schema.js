'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemeSchema extends Schema {
  up () {
    this.create('themes', (table) => {
      table.increments()
      table.string('creador').notNullable()
      table.string('nombretema').notNullable()
      table.string('estilonavbar').notNullable()
      table.string('estiloiconos').notNullable()
      table.string('estilopagina').notNullable()
      table.string('background').notNullable()
      table.string('userbox').notNullable()
      table.string('postbox').notNullable()
      table.string('colortexto').notNullable()
      table.string('moneda').notNullable()
      table.integer('precio').notNullable().unsigned().defaultTo(0)
      table.integer('contadorcompras').notNullable().unsigned().defaultTo(0)
      table.string('secure1',300).nullable()
      table.string('secure2',300).nullable()
      table.string('secure3',300).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('themes')
  }
}

module.exports = ThemeSchema
