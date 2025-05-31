import { useEffect, useState } from 'react';

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(itens);
  }, []);

  const removerItem = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  return (
    <div>
      <h1>Seu Carrinho</h1>
      {carrinho.length === 0 ? <p>Carrinho vazio.</p> : (
        <>
          {carrinho.map((item, index) => (
            <div key={index}>
              <h2>{item.nome}</h2>
              <p>R$ {item.preco.toFixed(2)}</p>
              <button onClick={() => removerItem(index)}>Remover</button>
            </div>
          ))}
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button onClick={() => alert("Compra finalizada!")}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
}

export default Carrinho;
