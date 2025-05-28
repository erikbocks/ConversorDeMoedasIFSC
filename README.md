# Conversor de Moedas

MVP do conversor de moedas desenvolvido em JavaScript, HTML e CSS. Permite converter valores entre diferentes moedas, exibindo o resultado e mantendo um histórico das conversões realizadas.

## Funcionalidades

- Conversão entre as moedas: `USD`, `EUR`, `BRL`, `JPY`, `GBP` e `CAD`
- Busca automática da taxa de câmbio via API
- Histórico das conversões realizadas
- Interface responsiva e amigável

## Como usar

1. Clone ou baixe este repositório.
2. Abra o arquivo `ConversorDeMoedas.html` em seu navegador.
3. Selecione as moedas de origem e destino, informe o valor e clique em **Converter**.
4. O resultado e o histórico aparecerão na tela.

## Estrutura dos arquivos

- `ConversorDeMoedas.html`: Interface principal do conversor
- `ConversorDeMoedas.js`: Lógica de conversão, requisição à API e histórico
- `ConversorDeMoedas.css`: Estilos da interface

## Dependências

- Conexão com a internet (para buscar taxas de câmbio na API [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas))

## Observações

- As taxas de câmbio são armazenadas em cache por 5 minutos para otimizar as requisições.
- O histórico é exibido apenas durante a sessão atual (não é salvo localmente).
- A interface é responsiva e se adapta a diferentes tamanhos de tela.