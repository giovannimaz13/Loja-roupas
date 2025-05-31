import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="App">
      <h1>Minha Loja Online</h1>

      <div className="produtos-container">
        {produtos.map(produto => (
          <div className="produto-card" key={produto.id}>
            <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
            <div className="produto-info">
              <h2>{produto.nome}</h2>
              <p className="preco">R$ {produto.preco.toFixed(2)}</p>
              <button className="botao" onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="carrinho-container">
        <h2>Carrinho</h2>
        {carrinho.length === 0 && <p>Seu carrinho está vazio.</p>}
        {carrinho.map((item, index) => (
          <div key={index} className="carrinho-item">
            <span>{item.nome} - R$ {item.preco.toFixed(2)}</span>
            <button className="botao" onClick={() => removerDoCarrinho(index)}>Remover</button>
          </div>
        ))}
        {carrinho.length > 0 && (
          <div className="resumo-total">
            Total: R$ {total.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


