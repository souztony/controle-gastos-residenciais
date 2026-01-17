import { useEffect, useState } from 'react';

import { listarTransacoes, criarTransacao } from '../api/transacoes';
import { listarPessoas } from '../api/pessoas';
import { listarCategorias } from '../api/categorias';

import type { Transacao } from '../types/Transacao';
import { TipoTransacao } from '../types/Transacao';

import type Pessoa from '../types/Pessoa';
import type { Categoria } from '../types/Categoria';
import { Finalidade } from '../types/Categoria';

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<string>('');
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  async function carregar() {
    setLoading(true);
    try {
      const [t, p, c] = await Promise.all([
        listarTransacoes(),
        listarPessoas(),
        listarCategorias()
      ]);
      setTransacoes(t || []);
      setPessoas(p || []);
      setCategorias(c || []);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);
  const isMenorDeIdade = pessoaSelecionada ? pessoaSelecionada.idade < 18 : false;

  useEffect(() => {
    if (isMenorDeIdade && tipo === TipoTransacao.Receita) {
      setTipo(TipoTransacao.Despesa);
    }
  }, [isMenorDeIdade, tipo]);

  const categoriasPermitidas = categorias.filter((c) => {
    if (tipo === TipoTransacao.Despesa) {
      return c.finalidade !== Finalidade.Receita;
    }
    return c.finalidade !== Finalidade.Despesa;
  });

  useEffect(() => {
    if (categoriaId !== 0 && !categoriasPermitidas.find(c => c.id === categoriaId)) {
      setCategoriaId(0);
    }
  }, [tipo, categoriasPermitidas, categoriaId]);

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
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>T</span>
        Lançamento de Transações
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Descrição</label>
          <input
            placeholder="Ex: Compra do mês"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Valor (R$)</label>
          <input
            type="number"
            placeholder="0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
          >
            <option value={TipoTransacao.Despesa}>Despesa</option>
            {!isMenorDeIdade && <option value={TipoTransacao.Receita}>Receita</option>}
          </select>
          {isMenorDeIdade && <p style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '0.25rem' }}>⚠️ Menores só podem lançar despesas</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Responsável</label>
          <select
            value={pessoaId}
            onChange={(e) => setPessoaId(Number(e.target.value))}
          >
            <option value={0}>Selecione a pessoa...</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.idade} anos)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
          >
            <option value={0}>Selecione a categoria...</option>
            {categoriasPermitidas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary" onClick={salvar} style={{ height: '46px' }}>
          Registrar Transação
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Carregando histórico...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>TIPO</th>
                <th>PESSOA</th>
                <th style={{ textAlign: 'right' }}>VALOR</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((t) => (
                <tr key={t.id}>
                  <td className="text-bold">{t.descricao || '-'}</td>
                  <td>
                    <span className={`badge ${t.tipo === TipoTransacao.Despesa ? 'badge-expense' : 'badge-income'}`}>
                      {t.tipo === TipoTransacao.Despesa ? 'Despesa' : 'Receita'}
                    </span>
                  </td>
                  <td>{t.pessoa?.nome}</td>
                  <td style={{ textAlign: 'right' }} className={`text-bold ${t.tipo === TipoTransacao.Despesa ? 'text-danger' : 'text-success'}`}>
                    {t.tipo === TipoTransacao.Despesa ? '-' : '+'} R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transacoes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Nenhuma transação registrada.
            </div>
          )}
        </div>
      )}
    </div>
  );
}