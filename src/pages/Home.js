import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    <div>
      <h1>Loja Streetwear</h1>
      {produtos.map(produto => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <img src={produto.imagem} alt={produto.nome} />
          <p>{produto.preco.toFixed(2)}</p>
          <Link to={`/produto/${produto.id}`}>Ver detalhes</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
