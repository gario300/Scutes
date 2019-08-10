'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.string('post', 300).notNullable()
        table.string('image', 300).nullable()
        table.string('imagepublicid',300).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
