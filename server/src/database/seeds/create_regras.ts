
import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('regras_atraso').insert([
        {nome : 'Até 3 dias', qtd_dias_inicial : 0, qtd_dias_final: 2, qtd_multa: 3, qtd_juros: .1},
        {nome : 'Superior a 3 dias', qtd_dias_inicial : 0, qtd_dias_final: 3, qtd_multa: 3, qtd_juros: .2},
        {nome : 'Superior a 5 dias', qtd_dias_inicial : 0, qtd_dias_final: 5, qtd_multa: 3, qtd_juros: .3}
    ]);
}