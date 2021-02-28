import { Request, Response } from 'express';
import knex from '../database/connect';
import moment from 'moment';

export async function showContas (req: Request, res: Response) {
    try {
        const contas = await knex('contas')
            .select('*')
            .leftJoin('regras_atraso', 'contas.id_regra', 'regras_atraso.id_regra');

        if (contas.length < 1) return res.status(204).json({msg: 'Nenhuma conta encontrada.', contas});

        return res.status(200).json({ msg: 'Contas encontradas com sucesso.', contas });
    } catch(e) {
        if (e && e.code && e.code === 'ECONNREFUSED'){
            return res.status(503).json({msg:'Falha na comunicação com o banco de dados. Tente novamente.'});
        }

        return res.status(500).json({msg: 'Erro ao buscar contas.', error: e});
    }
}

export async function createConta (req: Request, res: Response) {
    try {
        const { nome_conta, valor_original, data_vencimento, data_pagamento, tipo_juros } = req.body;
        const regras = await knex('regras_atraso').select('*');
        const diferenca_dias = moment(data_pagamento, 'YYYY-MM-DD').diff(moment(data_vencimento, 'YYYY-MM-DD'), 'days');
        let valor_final = valor_original;
        const regra_aplicada = regras.filter( regra => {
            if(!regra.qtd_dias_final) regra.qtd_dias_final = Infinity;
            return regra.qtd_dias_inicial < diferenca_dias && regra.qtd_dias_final >= diferenca_dias;
        });

        if(regra_aplicada.length > 0){
            switch (tipo_juros){
                case 'composto':
                    valor_final = calculaComposto(valor_original, regra_aplicada[0].qtd_juros, regra_aplicada[0].qtd_multa, diferenca_dias);
                break;
                default:
                    valor_final = calculaSimples(valor_original, regra_aplicada[0].qtd_juros, regra_aplicada[0].qtd_multa, diferenca_dias);
                break;
            }
        }

        const id_regra = regra_aplicada[0] ? regra_aplicada[0].id_regra : undefined;
        const transact = await knex.transaction();
        const insert = await transact('contas').insert({
            nome_conta, 
            valor_original, 
            data_vencimento, 
            data_pagamento, 
            diferenca_dias,
            valor_final,
            id_regra,
            tipo_juros
        });

        await transact.commit();

        return res.status(200).json({
            msg: 'Conta cadastrada com sucesso.',
            id_conta: insert[0]
        });
    } catch (e) {
        if (e && e.code && e.code === 'ECONNREFUSED'){
            return res.status(503).json({msg:'Falha na comunicação com o banco de dados. Tente novamente.'});
        }

        if (e && e.errno) {
            return res.status(400).json({msg: 'Verifique os dados enviados.', error: e.sqlMessage ? e.sqlMessage : 'desconhecido'});
        }

        return res.status(500).json({msg: 'Erro ao cadastrar conta.', error : e});
    }
}

export function calculaComposto(valor_original: number, qtd_juros: number, qtd_multa: number, diferenca_dias: number) {
    let valor_final = valor_original * ( Math.pow( 1 + ( qtd_juros / 100 ) , diferenca_dias ) );
    valor_final += ( valor_original * qtd_multa ) / 100;
    return valor_final.toFixed(2);
}

export function calculaSimples(valor_original: number, qtd_juros: number, qtd_multa: number, diferenca_dias: number) {
    let valor_final = valor_original + ( ( ( valor_original * qtd_juros) / 100 ) * diferenca_dias);
    valor_final += ( valor_original * qtd_multa ) / 100;
    return valor_final.toFixed(2);
}