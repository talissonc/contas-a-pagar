import { Request, Response } from 'express';
import knex from '@database/connect';
import moment from 'moment';

export async function showContas (req: Request, res: Response) {
    try {
        const contas = await knex('contas')
            .select('*')
            .leftJoin('regras_atraso', 'contas.id_regra', 'regras_atraso.id_regra');

        return res.status(200).json({ msg: 'Contas encontradas com sucesso.', contas });
    } catch(e) {
        return res.status(500).json({msg: 'Erro ao buscar contas.', error: e});
    }
}

export async function createConta (req: Request, res: Response) {
    try {
        const { nome_conta, valor_original, data_vencimento, data_pagamento } = req.body;
        const regras = await knex('regras_atraso').select('*');
        const diferenca_dias = moment(data_pagamento, 'YYYY-MM-DD').diff(moment(data_vencimento, 'YYYY-MM-DD'), 'days');
        let valor_final = valor_original;
        const regra_applicada = regras.filter( regra => {
            if(!regra.qtd_dias_final) regra.qtd_dias_final = Infinity;
            return regra.qtd_dias_inicial < diferenca_dias && regra.qtd_dias_final >= diferenca_dias;
        });

        if(regra_applicada.length > 0){
            valor_final += ((valor_original * regra_applicada[0].qtd_juros) / 100) * diferenca_dias;
            valor_final += (valor_original * regra_applicada[0].qtd_multa) / 100;
            valor_final = valor_final.toFixed(2);
        }

        const id_regra = regra_applicada[0] ? regra_applicada[0].id_regra : undefined;
        const transact = await knex.transaction();
        const insert = await transact('contas').insert({
            nome_conta, 
            valor_original, 
            data_vencimento, 
            data_pagamento, 
            diferenca_dias,
            valor_final,
            id_regra
        });

        await transact.commit();

        return res.status(200).json({
            msg: 'Conta cadastrada com sucesso.',
            id_conta: insert[0]
        });
    } catch (e) {
        return res.status(500).json({msg: 'Erro ao cadastrar conta.', error : e});
    }
}