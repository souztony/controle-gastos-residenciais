import { useEffect, useState } from 'react';

import { listarTransacoes, criarTransacao } from '../api/transacoes';
import { listarPessoas } from '../api/pessoas';
import { listarCategorias } from '../api/categorias';

import type { Transacao } from '../types/Transacao';
import { TipoTransacao } from '../types/Transacao';

import type Pessoa from '../types/Pessoa';
import type { Categoria } from '../types/Categoria';
import { Finalidade } from '../types/Categoria';

const tipoTransacaoLabel: Record<TipoTransacao, string> = {
  [TipoTransacao.Despesa]: 'Despesa',
  [TipoTransacao.Receita]: 'Receita',
};

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<string>('');
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
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
   * Regras:
   * - Despesa → Categoria Despesa ou Ambas
   * - Receita → Categoria Receita ou Ambas
   */
  const categoriasPermitidas = categorias.filter((c) => {
    if (tipo === TipoTransacao.Despesa) {
      return c.finalidade !== Finalidade.Receita;
    }

    return c.finalidade !== Finalidade.Despesa;
  });

  async function salvar() {
    if (!descricao.trim()) {
      alert('Descrição é obrigatória');
      return;
    }

    const valorNum = Number(valor);
    if (!valor || valorNum <= 0) {
      alert('Valor deve ser maior que zero');
      return;
    }

    if (!pessoaId || !categoriaId) {
      alert('Pessoa e categoria são obrigatórias');
      return;
    }

    try {
      // ✅ ENVIO CORRETO PARA O BACKEND (SEM "transacao")
      await criarTransacao({
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId,
        categoriaId,
      });

      setDescricao('');
      setValor('');
      setPessoaId(0);
      setCategoriaId(0);
      setTipo(TipoTransacao.Despesa);

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
        onChange={(e) => setValor(e.target.value)}
      />

      <select
        value={tipo}
        onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
      >
        <option value={TipoTransacao.Despesa}>Despesa</option>
        <option value={TipoTransacao.Receita}>Receita</option>
      </select>

      <select
        value={pessoaId}
        onChange={(e) => setPessoaId(Number(e.target.value))}
      >
        <option value={0}>Selecione a pessoa</option>
        {pessoas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
      >
        <option value={0}>Selecione a categoria</option>
        {categoriasPermitidas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.descricao}
          </option>
        ))}
      </select>

      <button onClick={salvar}>Salvar</button>

      <hr />

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {transacoes.map((t) => (
          <li key={t.id} style={{ marginBottom: '8px', padding: '8px', borderBottom: '1px solid #ccc' }}>
            {t.descricao ? `${t.descricao} — ` : ''}{tipoTransacaoLabel[t.tipo]} — {t.pessoa?.nome} — R$ {t.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}