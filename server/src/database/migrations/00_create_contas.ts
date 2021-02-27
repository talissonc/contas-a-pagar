import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('contas', table => {
        table.increments('id_conta').primary();
        table.string('nome').notNullable();
        table.date('data_vencimento').notNullable();
        table.date('data_pagamento').notNullable();
        table.double('valor').notNullable();
    });
}

export async function down(knex:Knex){
    return knex.schema.dropTable('contas');
}