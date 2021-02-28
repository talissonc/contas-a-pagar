import React, { useState, useEffect } from 'react';
import './styles.css';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Conta from '../../components/Conta';
import api from '../../services/api';
import ModalCadastraConta from '../../components/ModalCadastraConta';
import Swal from 'sweetalert';

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
    tipo_juros: string;
}

const Contas: React.FC = () => {
    const [contas, setContas] = useState<IConta[]>([]);
    const [showModalCadConta, setShowModalCadConta] = useState<boolean>(false);

    const loadContas = async () => {
        try {
            const response = await api.get('/contas');
            setContas(response.data.contas);
        } catch (e) {
            // console.log(JSON.stringify(e));
            if (e.message.indexOf('code 503') > -1){
                Swal('😕', 'Banco de dados indisponível no momento', 'error').then( () => {
                    loadContas();
                });
            } 
        }
    }
    
    useEffect(( )=>{
        loadContas();
    },[]);

    useEffect(( )=>{
        loadContas();
    },[showModalCadConta]);

    return (
        <>
        <Container fluid className="mt-3">
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h1 className="text-center mb-5">Contas a pagar</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-right mb-3">
                            <Button onClick={() => setShowModalCadConta(true) }>Adicionar Conta</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Nome</th>
                                    <th>Data de vencimento</th>
                                    <th>Data de pagamento</th>
                                    <th>Atraso</th>
                                    <th>Valor original</th>
                                    <th>Valor final</th>
                                    <th>Tipo de juros</th>
                                    <th>Regra aplicada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (!contas || contas.length < 1) && (
                                            <tr>
                                                <td colSpan={8}>
                                                    <h3 className="text-warning text-center">Nenhuma conta cadastrada</h3>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        contas?.map( conta => (
                                            <Conta key={conta.id_conta} conta={conta}/>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
            <ModalCadastraConta showModal={showModalCadConta} setShowModal={setShowModalCadConta} />
        </>
    );
}

export default Contas;