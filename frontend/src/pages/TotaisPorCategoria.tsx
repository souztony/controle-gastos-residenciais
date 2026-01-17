import { useEffect, useState } from 'react';
import { totaisPorCategoria } from '../api/totais';
import { TotalPessoa, TotalGeral } from '../types/Totais';

export default function TotaisPorCategoria() {
  const [categorias, setCategorias] = useState<TotalPessoa[]>([]);
  const [geral, setGeral] = useState<TotalGeral | null>(null);

  async function carregar() {
    try {
      const result = await totaisPorCategoria();
      setCategorias(result.categorias);
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
      <h2>Totais por Categoria</h2>

      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c, i) => (
            <tr key={i}>
              <td>{c.pessoa}</td>
              <td>{c.totalReceitas.toFixed(2)}</td>
              <td>{c.totalDespesas.toFixed(2)}</td>
              <td>{c.saldo.toFixed(2)}</td>
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