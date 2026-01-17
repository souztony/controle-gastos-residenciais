import { useState } from 'react';
import './index.css';

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
    <div className="container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Controle de Gastos
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Gerencie suas finanças residenciais com facilidade</p>
      </header>

      <nav className="glass-card" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', overflowX: 'auto', marginBottom: '2rem' }}>
        <button className={`nav-link ${pagina === 'pessoas' ? 'active' : ''}`} onClick={() => setPagina('pessoas')}>Pessoas</button>
        <button className={`nav-link ${pagina === 'categorias' ? 'active' : ''}`} onClick={() => setPagina('categorias')}>Categorias</button>
        <button className={`nav-link ${pagina === 'transacoes' ? 'active' : ''}`} onClick={() => setPagina('transacoes')}>Transações</button>
        <button className={`nav-link ${pagina === 'totaisPessoa' ? 'active' : ''}`} onClick={() => setPagina('totaisPessoa')}>Totais por Pessoa</button>
        <button className={`nav-link ${pagina === 'totaisCategoria' ? 'active' : ''}`} onClick={() => setPagina('totaisCategoria')}>Totais por Categoria</button>
      </nav>

      <main className="glass-card" style={{ minHeight: '400px' }}>
        {pagina === 'pessoas' && <Pessoas />}
        {pagina === 'categorias' && <Categorias />}
        {pagina === 'transacoes' && <Transacoes />}
        {pagina === 'totaisPessoa' && <TotaisPorPessoa />}
        {pagina === 'totaisCategoria' && <TotaisPorCategoria />}
      </main>

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; 2026 Sistema de Controle de Gastos Residenciais</p>
      </footer>
    </div>
  );
}