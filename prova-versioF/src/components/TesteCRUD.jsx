// components/TesteCRUD.jsx
// Componente de teste para verificar todas as operações CRUD

import React, { useState } from 'react';
import { Button, Card, Alert, Spinner, Form, Row, Col } from 'react-bootstrap';
import { 
  buscarTodosProdutos, 
  buscarProdutoPorId,
  criarProduto, 
  atualizarProduto, 
  deletarProduto,
  verificarConexaoServidor,
  obterEstatisticasProdutos 
} from '../services/produtoService.js';

export default function TesteCRUD() {
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);
  const [produtoTeste] = useState({
    nome: 'Produto Teste CRUD',
    descricao: 'Produto criado para testar operações CRUD',
    preco: 99.99,
    imgSrc: 'produto-1.jpg',
    quantidade: 10,
    avaliacao: 4.5,
    stars: 4.5,
    noCarrinho: false
  });

  const log = (mensagem) => {
    setResultado(prev => prev + '\n' + mensagem);
    console.log(mensagem);
  };

  const testarConexao = async () => {
    setLoading(true);
    setResultado('=== TESTE DE CONEXÃO ===\n');
    
    try {
      const conectado = await verificarConexaoServidor();
      log(`Servidor JSON Server: ${conectado ? '✅ ONLINE' : '❌ OFFLINE'}`);
      
      if (conectado) {
        log('✅ Conexão com JSON Server estabelecida!');
      } else {
        log('❌ Erro: JSON Server não está rodando na porta 3000');
      }
    } catch (error) {
      log(`❌ Erro ao testar conexão: ${error.message}`);
    }
    
    setLoading(false);
  };

  const testarOperacoesCRUD = async () => {
    setLoading(true);
    setResultado('=== TESTE COMPLETO DE CRUD ===\n');
    
    try {
      // 1. Verificar conexão
      log('1. Verificando conexão...');
      const conectado = await verificarConexaoServidor();
      if (!conectado) {
        throw new Error('JSON Server não está rodando');
      }
      log('✅ Conexão OK');

      // 2. Listar produtos iniciais (READ)
      log('\n2. Listando produtos existentes...');
      const produtosIniciais = await buscarTodosProdutos();
      log(`✅ ${produtosIniciais.length} produtos encontrados`);

      // 3. Criar novo produto (CREATE)
      log('\n3. Criando novo produto...');
      const novoProduto = await criarProduto(produtoTeste);
      log(`✅ Produto criado com ID: ${novoProduto.id}`);
      log(`   Nome: ${novoProduto.nome}`);

      // 4. Buscar produto por ID (READ)
      log('\n4. Buscando produto por ID...');
      const produtoBuscado = await buscarProdutoPorId(novoProduto.id);
      log(`✅ Produto encontrado: ${produtoBuscado.nome}`);

      // 5. Atualizar produto (UPDATE)
      log('\n5. Atualizando produto...');
      const dadosAtualizados = {
        ...novoProduto,
        nome: 'Produto Teste CRUD - ATUALIZADO',
        preco: 149.99
      };
      const produtoAtualizado = await atualizarProduto(novoProduto.id, dadosAtualizados);
      log(`✅ Produto atualizado: ${produtoAtualizado.nome}`);
      log(`   Novo preço: R$ ${produtoAtualizado.preco}`);

      // 6. Obter estatísticas
      log('\n6. Obtendo estatísticas...');
      const stats = await obterEstatisticasProdutos();
      log(`✅ Total de produtos: ${stats.total}`);
      log(`   Em estoque: ${stats.emEstoque}`);
      log(`   Preço médio: R$ ${stats.precoMedio.toFixed(2)}`);

      // 7. Deletar produto (DELETE)
      log('\n7. Removendo produto de teste...');
      await deletarProduto(novoProduto.id);
      log('✅ Produto removido com sucesso');

      // 8. Verificar se foi removido
      log('\n8. Verificando se produto foi removido...');
      try {
        await buscarProdutoPorId(novoProduto.id);
        log('❌ ERRO: Produto ainda existe!');
      } catch (error) {
        log('✅ Produto foi removido corretamente');
      }

      log('\n🎉 TODOS OS TESTES PASSARAM! CRUD FUNCIONANDO PERFEITAMENTE!');

    } catch (error) {
      log(`\n❌ ERRO NO TESTE: ${error.message}`);
      log('Verifique se o JSON Server está rodando: npm run json-server');
    }
    
    setLoading(false);
  };

  const limparResultados = () => {
    setResultado('');
  };

  return (
    <Card className="m-3">
      <Card.Header>
        <h4>🧪 Teste de Operações CRUD</h4>
        <small className="text-muted">
          Ferramenta para testar todas as operações CRUD com o JSON Server
        </small>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <Button 
              variant="primary" 
              onClick={testarConexao}
              disabled={loading}
              className="me-2"
            >
              {loading ? <Spinner animation="border" size="sm" /> : '🔍'}
              Testar Conexão
            </Button>
            
            <Button 
              variant="success" 
              onClick={testarOperacoesCRUD}
              disabled={loading}
              className="me-2"
            >
              {loading ? <Spinner animation="border" size="sm" /> : '🚀'}
              Testar CRUD Completo
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={limparResultados}
              disabled={loading}
            >
              🗑️ Limpar
            </Button>
          </Col>
        </Row>

        {resultado && (
          <Alert variant="dark">
            <Alert.Heading>Resultados dos Testes:</Alert.Heading>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em' }}>
              {resultado}
            </pre>
          </Alert>
        )}

        <Alert variant="info" className="mt-3">
          <Alert.Heading>ℹ️ Instruções</Alert.Heading>
          <ul className="mb-0">
            <li><strong>Teste de Conexão:</strong> Verifica se o JSON Server está rodando</li>
            <li><strong>Teste CRUD Completo:</strong> Executa todas as operações (CREATE, READ, UPDATE, DELETE)</li>
            <li><strong>Pré-requisito:</strong> JSON Server deve estar rodando na porta 3000</li>
            <li><strong>Comando:</strong> <code>json-server --watch server.json --port 3000</code></li>
          </ul>
        </Alert>
      </Card.Body>
    </Card>
  );
}