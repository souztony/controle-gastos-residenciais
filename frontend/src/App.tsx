import { useState } from 'react';

import Pessoas from './pages/Pessoas';
import Categorias from './pages/Categorias';
import Transacoes from './pages/Transacoes';
import TotaisPorPessoa from './pages/TotaisPorPessoa';
import TotaisPorCategoria from './pages/TotaisPorCategoria';

type Pagina =
  | 'pessoas'
  | 'categorias'
  | 'transacoes'
  | 'totaisPessoa'
  | 'totaisCategoria';

export default function App() {
  const [pagina, setPagina] = useState<Pagina>('pessoas');

  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPagina('pessoas')}>Pessoas</button>
        <button onClick={() => setPagina('categorias')}>Categorias</button>
        <button onClick={() => setPagina('transacoes')}>Transações</button>
        <button onClick={() => setPagina('totaisPessoa')}>Totais por Pessoa</button>
        <button onClick={() => setPagina('totaisCategoria')}>
          Totais por Categoria
        </button>
      </nav>

      {pagina === 'pessoas' && <Pessoas />}
      {pagina === 'categorias' && <Categorias />}
      {pagina === 'transacoes' && <Transacoes />}
      {pagina === 'totaisPessoa' && <TotaisPorPessoa />}
      {pagina === 'totaisCategoria' && <TotaisPorCategoria />}
    </div>
  );
}