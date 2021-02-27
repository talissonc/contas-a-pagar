
import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('regras_atraso').insert([
        {nome_regra : 'Até 3 dias', qtd_dias_inicial : 0, qtd_dias_final: 3, qtd_multa: 2, qtd_juros: .1},
        {nome_regra : 'Superior a 3 dias', qtd_dias_inicial : 3, qtd_dias_final: 5, qtd_multa: 3, qtd_juros: .2},
        {nome_regra : 'Superior a 5 dias', qtd_dias_inicial : 5, qtd_multa: 5, qtd_juros: .3}
    ]);
}