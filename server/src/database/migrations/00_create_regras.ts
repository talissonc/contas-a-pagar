import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('regras_atraso', table => {
        table.increments('id_regra').primary();
        table.string('nome_regra').notNullable();
        table.integer('qtd_dias_inicial').notNullable();
        table.integer('qtd_dias_final');
        table.double('qtd_multa').notNullable();
        table.double('qtd_juros').notNullable();
    });
}

export async function down(knex:Knex){
    return knex.schema.dropTable('regras_atraso');
}