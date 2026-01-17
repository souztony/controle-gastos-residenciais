import { useEffect, useState } from 'react';
import type { Categoria, Finalidade } from '../types/Categoria';
import { listarCategorias, criarCategoria } from '../api/categorias';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<Finalidade>(0); // 0 = Despesa
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const dados = await listarCategorias();
      setCategorias(dados || []);
    } catch (e: any) {
      alert(e.message || 'Erro ao carregar categorias');
    } finally {
      setLoading(false);
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
        finalidade,
      });

      setDescricao('');
      setFinalidade(0);
      carregar();
    } catch (e: any) {
      alert(e.message || 'Erro ao criar categoria');
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
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>C</span>
        Categorias de Transação
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Descrição</label>
          <input
            placeholder="Ex: Alimentação, Salário..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Finalidade</label>
          <select
            value={finalidade}
            onChange={(e) => setFinalidade(Number(e.target.value) as Finalidade)}
          >
            <option value={0}>Despesa</option>
            <option value={1}>Receita</option>
            <option value={2}>Ambas (Receita e Despesa)</option>
          </select>
        </div>

        <button className="btn-primary" onClick={salvar} style={{ height: '46px' }}>
          Adicionar Categoria
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Carregando dados...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>FINALIDADE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td className="text-bold">{c.descricao}</td>
                  <td>{finalidadeTexto(c.finalidade)}</td>
                  <td>
                    <span className={`badge ${c.finalidade === 0 ? 'badge-expense' : 'badge-income'}`} style={{ opacity: c.finalidade === 2 ? 0.8 : 1 }}>
                      Válido
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categorias.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Nenhuma categoria cadastrada.
            </div>
          )}
        </div>
      )}
    </div>
  );
}