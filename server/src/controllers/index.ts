import { Request, Response } from 'express';
import knex from '@database/connect';

export async function showContas (req: Request, res: Response) {
    try {
        const regras = await knex('regras_atraso').select('*');
        const contas = await knex('contas').select('*');
        return res.status(200).json({msg: 'Contas encontradas com sucesso.', contas});
    } catch(e) {
        return res.status(500).json({msg: 'Erro ao buscar contas.', error: e});
    }
}

export async function createConta (req: Request, res: Response) {
    try {
        const { nome, valor, data_vencimento, data_pagamento } = req.body;
        const transact = await knex.transaction();
        const insert = await transact('contas').insert({nome, valor, data_vencimento, data_pagamento});
        await transact.commit();
        return res.status(200).json({
            msg: 'Conta cadastrada com sucesso.',
            id_conta: insert[0]
        });
    } catch (e) {

    }
}