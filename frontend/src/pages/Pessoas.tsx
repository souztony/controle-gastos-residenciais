import { useEffect, useState } from 'react';
import type { Pessoa } from '../types/Pessoa'
import { listarPessoas, criarPessoa, deletarPessoa } from '../api/pessoas';

export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number>(0);

  async function carregar() {
    try {
      setPessoas(await listarPessoas());
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function salvar() {
    try {
      await criarPessoa({ nome, idade });
      setNome('');
      setIdade(0);
      carregar();
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function remover(id: number) {
    if (!confirm('Deseja realmente remover esta pessoa?')) return;

    try {
      await deletarPessoa(id);
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
        onChange={(e) => setIdade(Number(e.target.value))}
      />

      <button onClick={salvar}>Salvar</button>

      <ul>
        {pessoas.map((p) => (
          <li key={p.id}>
            {p.nome} ({p.idade} anos)
            <button onClick={() => remover(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}