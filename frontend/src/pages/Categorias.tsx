import { useEffect, useState } from 'react';
import type { Categoria, Finalidade } from '../types/Categoria';
import { listarCategorias, criarCategoria } from '../api/categorias';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<Finalidade>(0); // 0 = Despesa

  async function carregar() {
    try {
      const dados = await listarCategorias();
      setCategorias(dados);
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
      await criarCategoria({
        descricao,
        finalidade, // número: 0 | 1 | 2
      });

      setDescricao('');
      setFinalidade(0);
      carregar();
    } catch (e: any) {
      alert(e.message);
    }
  }

  function finalidadeTexto(valor: Finalidade) {
    if (valor === 0) return 'Despesa';
    if (valor === 1) return 'Receita';
    if (valor === 2) return 'Ambas';
    return '';
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
        onChange={(e) => setFinalidade(Number(e.target.value) as Finalidade)}
      >
        <option value={0}>Despesa</option>
        <option value={1}>Receita</option>
        <option value={2}>Ambas</option>
      </select>

      <button onClick={salvar}>Salvar</button>

      <ul>
        {categorias.map((c) => (
          <li key={c.id}>
            {c.descricao} — {finalidadeTexto(c.finalidade)}
          </li>
        ))}
      </ul>
    </div>
  );
}