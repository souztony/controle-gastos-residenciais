import { useEffect, useState } from 'react';
import { listarTransacoes, criarTransacao } from '../api/transacoes';
import { listarPessoas } from '../api/pessoas';
import { listarCategorias } from '../api/categorias';

import { Pessoa } from '../types/Pessoa';
import { Categoria } from '../types/Categoria';
import { TipoTransacao, Transacao } from '../types/Transacao';

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoTransacao>('Despesa');
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  async function carregar() {
    try {
      setTransacoes(await listarTransacoes());
      setPessoas(await listarPessoas());
      setCategorias(await listarCategorias());
    } catch (e: any) {
      alert(e.message);
    }
  }

  /**
   * Filtra categorias conforme regra do negócio:
   * - Se tipo = Despesa → aceita Despesa ou Ambas
   * - Se tipo = Receita → aceita Receita ou Ambas
   */
  const categoriasPermitidas = categorias.filter((c) => {
    if (tipo === 'Despesa') return c.finalidade !== 'Receita';
    return c.finalidade !== 'Despesa';
  });

  async function salvar() {
    if (!descricao.trim()) {
      alert('Descrição é obrigatória');
      return;
    }

    if (valor <= 0) {
      alert('Valor deve ser maior que zero');
      return;
    }

    try {
      await criarTransacao({
        descricao,
        valor,
        tipo,
        pessoaId,
        categoriaId,
      });

      // Limpa formulário
      setDescricao('');
      setValor(0);
      setPessoaId(0);
      setCategoriaId(0);

      carregar();
    } catch (e: any) {
      /**
       * Aqui entram as regras do backend:
       * - Menor de idade só pode despesa
       * - Categoria incompatível com tipo
       * O backend retorna erro → mostramos ao usuário
       */
      alert(e.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Transações</h2>

      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoTransacao)}>
        <option value="Despesa">Despesa</option>
        <option value="Receita">Receita</option>
      </select>

      <select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
        <option value={0}>Selecione a pessoa</option>
        {pessoas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))}>
        <option value={0}>Selecione a categoria</option>
        {categoriasPermitidas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.descricao}
          </option>
        ))}
      </select>

      <button onClick={salvar}>Salvar</button>

      <hr />

      <ul>
        {transacoes.map((t) => (
          <li key={t.id}>
            {t.descricao} — {t.tipo} — R$ {t.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}