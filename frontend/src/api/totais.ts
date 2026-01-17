import { request } from './http';
import type { TotalPessoa, TotalGeral } from '../types/Totais';

export function totaisPorPessoa() {
  return request<{ pessoas: TotalPessoa[]; geral: TotalGeral }>('/Relatorios/pessoas');
}

export function totaisPorCategoria() {
  return request<{ categorias: TotalPessoa[]; geral: TotalGeral }>('/Relatorios/categorias');
}