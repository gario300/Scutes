'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplySchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
        table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')
        table.string('reply',300).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('replies')
  }
}

module.exports = ReplySchema
