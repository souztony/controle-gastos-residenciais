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
    if (!confirm('Deseja realmente remover esta pessoa?')) return;

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

  if (loading) return <p>Carregando pessoas...</p>;
  if (erro) return <p style={{ color: 'red' }}>Erro: {erro}</p>;

  return (
    <div>
      <h2>Pessoas</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) =>
          setIdade(e.target.value === '' ? '' : Number(e.target.value))
        }
      />

      <button onClick={salvar}>Salvar</button>

      <ul>
        {pessoas?.map((p) => (
          <li key={p.id}>
            {p.nome} ({p.idade} anos)
            <button onClick={() => remover(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}