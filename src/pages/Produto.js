import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduto(data));
  }, [id]);

  const adicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{produto.nome}</h1>
      <img src={produto.imagem} alt={produto.nome} />
      <p>{produto.descricao}</p>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <button onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default Produto;
