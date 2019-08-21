'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
        table.string('name').notNullable()
        table.string('username', 80).notNullable().unique()
        table.string('avatar', 200).notNullable().defaultTo('https://res.cloudinary.com/scute/image/upload/v1566358443/recursos/default_hduxaa.png')    
        table.string('avatarpublicid').notNullable()
        table.text('bio', 100).nullable()
        table.string('location').nullable()
        table.date('edad').nullable()
        table.string('email', 254).notNullable().unique()
        table.string('password', 60).notNullable()
        table.integer('puntos').defaultTo(0)
        table.string('portada', 300).notNullable().defaultTo('https://res.cloudinary.com/scute/image/upload/v1562085145/banner2-min_1_z9vzlb.png')
        table.boolean('Partner').notNullable().defaultTo(false)
        table.boolean('Mod').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
