import { useEffect, useState } from 'react';
import { totaisPorPessoa } from '../api/totais';

interface RelatorioPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface RespostaRelatorio {
  pessoas: RelatorioPessoa[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  };
}

export default function TotaisPorPessoa() {
  const [data, setData] = useState<RespostaRelatorio | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const result = await totaisPorPessoa();
      setData(result);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Calculando totais...</div>;
  if (!data) return null;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: 'var(--success)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>$</span>
        Totais por Pessoa
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>PESSOA</th>
              <th style={{ textAlign: 'right' }}>RECEITAS (+)</th>
              <th style={{ textAlign: 'right' }}>DESPESAS (-)</th>
              <th style={{ textAlign: 'right' }}>SALDO LÍQUIDO</th>
            </tr>
          </thead>
          <tbody>
            {data.pessoas.map((p) => (
              <tr key={p.pessoaId}>
                <td className="text-bold">{p.nome}</td>
                <td style={{ textAlign: 'right' }} className="text-success">R$ {p.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }} className="text-danger">R$ {p.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }} className={`text-bold ${p.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                  R$ {p.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ borderTop: '2px solid var(--glass-border)' }}>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <td className="text-bold" style={{ padding: '1.25rem' }}>TOTAL GERAL</td>
              <td style={{ textAlign: 'right' }} className="text-bold text-success">
                R$ {data.totalGeral.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ textAlign: 'right' }} className="text-bold text-danger">
                R$ {data.totalGeral.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ textAlign: 'right' }} className={`text-bold ${data.totalGeral.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                R$ {data.totalGeral.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="glass-card" style={{ marginBottom: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Receita Total</p>
          <h3 className="text-success">R$ {data.totalGeral.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="glass-card" style={{ marginBottom: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Despesa Total</p>
          <h3 className="text-danger">R$ {data.totalGeral.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="glass-card" style={{ marginBottom: 0, textAlign: 'center', border: `1px solid ${data.totalGeral.saldo >= 0 ? 'var(--success)' : 'var(--danger)'}` }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Saldo Líquido</p>
          <h3 className={data.totalGeral.saldo >= 0 ? 'text-success' : 'text-danger'}>
            R$ {data.totalGeral.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>
    </div>
  );
}