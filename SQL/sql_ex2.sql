
# 2.1) Consulta que retorne todos os pedidos do cliente “AFONSO COSTA”
SELECT A1.A1_NOME, C5.C5_CODCLI, C5.C5_NUM, C5.C5_EMISSAO
FROM C5
JOIN A1 ON C5.C5_CODCLI = A1.A1_COD
WHERE A1.A1_NOME = 'AFONSO COSTA';

# 2.2) Consulta que retorne todos os pedidos (com seus itens respectivos) emitidos no mês de janeiro de 2023
SELECT C5.C5_NUM, C5.C5_EMISSAO, C5.C5_CODCLI, C6.C6_ITEM, C6.C6_CODPROD, C6.C6_QTD, C6.C6_PRUNIT
FROM C5
JOIN C6 ON C5.C5_NUM = C6.C6_NUM
WHERE C5.C5_EMISSAO >= '2023-01-01' AND C5.C5_EMISSAO <= '2023-01-31'
ORDER BY C5.C5_EMISSAO;

# 2.3) Consulta que retorne o valor total dos pedidos em fevereiro de 2023
SELECT SUM(C6.C6_QTD * C6.C6_PRUNIT) AS TOTAL_FEVEREIRO_23
FROM C5
JOIN C6 ON C5.C5_NUM = C6.C6_NUM
WHERE C5.C5_EMISSAO >= '2023-02-01' AND C5.C5_EMISSAO < '2023-03-01'
GROUP BY C5.C5_NUM, C5.C5_EMISSAO;

# 2.4) Consulta que retorne o valor total dos pedidos agrupados por nome de vendedor
SELECT A3.A3_NOME AS VENDEDOR, SUM(C6.C6_QTD * C6.C6_PRUNIT) AS TOTAL
FROM C5
JOIN C6 ON C5.C5_NUM = C6.C6_NUM
JOIN A3 ON C5.C5_CODVEN = A3.A3_COD
GROUP BY A3.A3_NOME;

# 2.5) Consulta que retorne o valor total dos pedidos, vendidos em 2022 agrupados por tipo de cliente (pessoa física ou jurídica)
SELECT A1.A1_TIPO AS TIPO_CLIENTE, SUM(C6.C6_QTD * C6.C6_PRUNIT) AS VALOR_TOTAL
FROM C5
JOIN C6 ON C5.C5_NUM = C6.C6_NUM
JOIN A1 ON C5.C5_CODCLI = A1.A1_COD
WHERE C5.C5_EMISSAO BETWEEN '2022-01-01' AND '2022-12-31'
GROUP BY A1.A1_TIPO;

# 2.6) Consulta que retorne o valor total dos pedidos, vendidos no primeiro semestre de 2023 agrupados por região do vendedor
SELECT A3.A3_REGIAO AS REGIAO, SUM(C6.C6_QTD * C6.C6_PRUNIT) AS TOTAL
FROM C5
JOIN C6 ON C5.C5_NUM = C6.C6_NUM
JOIN A3 ON C5.C5_CODVEN = A3.A3_COD
WHERE C5.C5_EMISSAO >= '2023-01-01' AND C5.C5_EMISSAO <= '2023-06-30'
GROUP BY A3.A3_REGIAO;


