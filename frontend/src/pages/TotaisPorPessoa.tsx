import { useEffect, useState } from 'react';
import { totaisPorPessoa } from '../api/totais';
import type { TotalPessoa, TotalGeral } from '../types/Totais';

export default function TotaisPorPessoa() {
  const [pessoas, setPessoas] = useState<TotalPessoa[]>([]);
  const [geral, setGeral] = useState<TotalGeral | null>(null);

  async function carregar() {
    try {
      const result = await totaisPorPessoa();
      setPessoas(result.pessoas);
      setGeral(result.geral);
    } catch (e: any) {
      alert(e.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Totais por Pessoa</h2>

      <table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((p, i) => (
            <tr key={i}>
              <td>{p.pessoa}</td>
              <td>{p.totalReceitas.toFixed(2)}</td>
              <td>{p.totalDespesas.toFixed(2)}</td>
              <td>{p.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        {geral && (
          <tfoot>
            <tr>
              <th>Total Geral</th>
              <th>{geral.totalReceitas.toFixed(2)}</th>
              <th>{geral.totalDespesas.toFixed(2)}</th>
              <th>{geral.saldo.toFixed(2)}</th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}