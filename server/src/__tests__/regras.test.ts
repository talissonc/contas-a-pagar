import { calculaComposto, calculaSimples } from '../controllers';

test('calcula juros composto', () => {
    const jurosComposto = calculaComposto(30, 0.3, 5, 12);
    expect(32.6).toEqual(parseFloat(jurosComposto));
});

test('calcula juros simples', () => {
    const jurosSimples = calculaSimples(30, .3, 5, 12);
    expect(32.58).toEqual(parseFloat(jurosSimples));
});