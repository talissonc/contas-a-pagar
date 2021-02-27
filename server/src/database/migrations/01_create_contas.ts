import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('contas', table => {
        table.increments('id_conta').primary();
        table.string('nome_conta').notNullable();
        table.date('data_vencimento').notNullable();
        table.date('data_pagamento').notNullable();
        table.double('valor_original').notNullable();
        table.double('valor_final').notNullable();
        table.integer('diferenca_dias').notNullable();
        table.integer('id_regra', 10).unsigned().references('id_regra').inTable('regras_atraso');
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('contas');
}