const calculadora = require("../../models/calculadora.js");

test("somar 2 + 2 deve retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 100 + 5 deve retornar 4", () => {
  const resultado = calculadora.somar(100, 5);
  expect(resultado).toBe(105);
});

test("numeros bem grandes para testar", () => {
  const resultado = calculadora.somar(901826731789, 89762137891623);
  expect(resultado).toBe(90663964623412);
});

test("Testando soma com variaveis não numeros", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});

test("2Testando soma com variaveis não numeros", () => {
  const resultado = calculadora.somar("banana", "banana");
  expect(resultado).toBe("Erro");
});
