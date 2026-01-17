import { useEffect, useState } from 'react';
import { totaisPorCategoria } from '../api/totais';

interface RelatorioCategoria {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface RespostaRelatorio {
  categorias: RelatorioCategoria[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  };
}

export default function TotaisPorCategoria() {
  const [data, setData] = useState<RespostaRelatorio | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const result = await totaisPorCategoria();
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

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Categorizando totais...</div>;
  if (!data) return null;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>Σ</span>
        Totais por Categoria
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>CATEGORIA</th>
              <th style={{ textAlign: 'right' }}>RECEITAS (+)</th>
              <th style={{ textAlign: 'right' }}>DESPESAS (-)</th>
              <th style={{ textAlign: 'right' }}>SALDO LÍQUIDO</th>
            </tr>
          </thead>
          <tbody>
            {data.categorias.map((c) => (
              <tr key={c.pessoaId}>
                <td className="text-bold">{c.nome}</td>
                <td style={{ textAlign: 'right' }} className="text-success">R$ {c.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }} className="text-danger">R$ {c.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }} className={`text-bold ${c.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                  R$ {c.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ borderTop: '2px solid var(--glass-border)' }}>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <td className="text-bold" style={{ padding: '1.25rem' }}>RESUMO GERAL</td>
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
    </div>
  );
}