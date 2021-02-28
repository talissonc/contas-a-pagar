import React from 'react';
import { Modal, Button, Form, Col, Row, InputGroup } from 'react-bootstrap';
import api from '../../services/api';

interface IModal {
    showModal: boolean;
    setShowModal: (state:boolean) => void;
}

interface IDadosConta {
    nome_conta: string,
    data_vencimento: string,
    data_pagamento: string,
    valor_original: number
}

const ModalCadastraConta: React.FC<IModal> = ({showModal, setShowModal}) => {
    const cadastrarConta = async (ev: any) => {
        try{
            ev.preventDefault();
            const formData = new FormData(ev.target),
            formDataObj = Object.fromEntries(formData.entries());
            const dados:IDadosConta = {
                nome_conta: formDataObj.nome_conta.toString(),
                data_vencimento: formDataObj.data_vencimento.toString(),
                data_pagamento: formDataObj.data_pagamento.toString(),
                valor_original: parseFloat(formDataObj.valor_original.toString())
            }
            const conta = await api.post('/conta', dados, {
                headers: { 'Content-Type': 'application/json' }
            });
            setShowModal(false);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="modal-cadastra-conta"
        >
            <Form onSubmit={cadastrarConta}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Cadastrar conta
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={8}>
                            <Form.Group controlId="formCadastroConta.nome_conta">
                                <Form.Label>Nome da conta</Form.Label>
                                <Form.Control name="nome_conta" type="text" placeholder="Conta de luz" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group controlId="formCadastroConta.valor">
                                <Form.Label>Valor</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>R$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="valor_original" type="number" placeholder="00.00" />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="formCadastroConta.data_vencimento">
                                <Form.Label>Data de vencimento</Form.Label>
                                <Form.Control name="data_vencimento" type="date" placeholder="dd/mm/aaaa" />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="formCadastroConta.data_pagamento">
                                <Form.Label>Data de pagamento</Form.Label>
                                <Form.Control name="data_pagamento" type="date" placeholder="dd/mm/aaaa" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ () => { setShowModal(false) } } variant="secondary">Fechar</Button>
                    <Button type="submit" variant="primary">Cadastrar conta</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalCadastraConta;