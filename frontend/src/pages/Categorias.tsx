import { useEffect, useState } from 'react';
import type { Categoria, Finalidade } from '../types/Categoria';
import { listarCategorias, criarCategoria } from '../api/categorias';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<Finalidade>('Despesa');

  async function carregar() {
    try {
      setCategorias(await listarCategorias());
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function salvar() {
    if (!descricao.trim()) {
      alert('Descrição é obrigatória');
      return;
    }

    try {
      await criarCategoria({ descricao, finalidade });
      setDescricao('');
      setFinalidade('Despesa');
      carregar();
    } catch (e: any) {
      alert(e.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>

      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select
        value={finalidade}
        onChange={(e) => setFinalidade(e.target.value as Finalidade)}
      >
        <option value="Despesa">Despesa</option>
        <option value="Receita">Receita</option>
        <option value="Ambas">Ambas</option>
      </select>

      <button onClick={salvar}>Salvar</button>

      <ul>
        {categorias.map((c) => (
          <li key={c.id}>
            {c.descricao} — {c.finalidade}
          </li>
        ))}
      </ul>
    </div>
  );
}