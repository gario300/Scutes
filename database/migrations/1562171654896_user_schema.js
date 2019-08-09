'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
        table.string('name').notNullable()
        table.string('username', 80).notNullable().unique()
        table.string('avatar', 200).nullable()
        table.string('email', 254).notNullable().unique()
        table.string('password', 60).notNullable()
        table.string('location').nullable()
        table.string('portada', 300).nullable(.defaultTo('https://res.cloudinary.com/scute/image/upload/v1562085145/banner2-min_1_z9vzlb.png'))
        table.boolean('Partner').notNullable().defaultTo(false)
        table.boolean('Mod').notNullable().defaultTo(false)
        table.text('bio').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
