import { useEffect, useState } from 'react';
import type Pessoa from '../types/Pessoa';
import { listarPessoas, criarPessoa, deletarPessoa } from '../api/pessoas';

export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const dados = await listarPessoas();
      setPessoas(dados || []);
    } catch (e: any) {
      console.error(e);
      setErro(e.message || 'Erro ao carregar pessoas');
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    if (!nome.trim()) {
      alert('Informe o nome');
      return;
    }

    if (idade === '') {
      alert('Informe a idade');
      return;
    }

    try {
      await criarPessoa({ nome, idade });
      setNome('');
      setIdade('');
      carregar();
    } catch (e: any) {
      alert(e.message || 'Erro ao criar pessoa');
    }
  }

  async function remover(id: number) {
    if (!confirm('Deseja realmente remover esta pessoa? Todas as transações vinculadas serão apagadas.')) return;

    try {
      await deletarPessoa(id);
      carregar();
    } catch (e: any) {
      alert(e.message || 'Erro ao deletar pessoa');
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '1rem' }}>P</span>
        Gerenciamento de Pessoas
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Nome Completo</label>
          <input
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Idade</label>
          <input
            type="number"
            placeholder="0"
            value={idade}
            onChange={(e) =>
              setIdade(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </div>

        <button className="btn-primary" onClick={salvar} style={{ height: '46px' }}>
          Adicionar Pessoa
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Carregando dados...</div>
      ) : erro ? (
        <div className="glass-card" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Erro: {erro}</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>IDADE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {pessoas?.map((p) => (
                <tr key={p.id}>
                  <td className="text-bold">{p.nome}</td>
                  <td>{p.idade} anos</td>
                  <td>
                    <span className={`badge ${p.idade >= 18 ? 'badge-income' : 'badge-expense'}`} style={{ textTransform: 'none' }}>
                      {p.idade >= 18 ? 'Adulto' : 'Menor de Idade'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => remover(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pessoas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Nenhuma pessoa cadastrada.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
