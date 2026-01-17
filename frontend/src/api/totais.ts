import { request } from './http';
import { TotalPessoa, TotalGeral } from '../types/Totais';

export function totaisPorPessoa() {
  return request<{ pessoas: TotalPessoa[]; geral: TotalGeral }>('/Totais/Pessoas');
}

export function totaisPorCategoria() {
  return request<{ categorias: TotalPessoa[]; geral: TotalGeral }>('/Totais/Categorias');
}