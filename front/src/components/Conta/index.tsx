import React from 'react';
import moment from 'moment';
interface IConta {
    nome_conta: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_original: number;
    valor_final: number;
    id_conta: number;
    id_regra: number;
    qtd_juros: number;
    qtd_multa: number;
    nome_regra: string;
    diferenca_dias: number; 
}

interface PorpsConta {
    conta: IConta
}

const Conta: React.FC<PorpsConta> = ({conta}) => {
    return (
        <tr>
            <td>{conta.nome_conta}</td>
            <td>{moment(conta.data_vencimento).format('DD/MM/YYYY')}</td>
            <td>{moment(conta.data_pagamento).format('DD/MM/YYYY')}</td>
            <td>{
                conta.diferenca_dias > 0 ? 
                `Paga com ${Math.abs(conta.diferenca_dias)} ${Math.abs(conta.diferenca_dias) > 1 ? 'dias' : 'dia'} de atraso` : 
                `Paga com ${Math.abs(conta.diferenca_dias)} ${Math.abs(conta.diferenca_dias) > 1 ? 'dias' : 'dia'} de antecêdencia`
            }</td>
            <td>R$ {conta.valor_original.toFixed(2).replace('.',',')}</td>
            <td>R$ {conta.valor_final.toFixed(2).replace('.',',')}</td>
            <td>{conta.diferenca_dias > 0 ? conta.nome_regra : Math.abs(conta.diferenca_dias) == 0 ? 'Conta paga em dia' : 'Conta paga adiantada'}</td>
        </tr>
    )
}

export default Conta;