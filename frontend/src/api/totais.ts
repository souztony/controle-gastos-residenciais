import { request } from './http';
import type { TotalPessoa, TotalGeral } from '../types/Totais';

export function totaisPorPessoa() {
  return request<{ pessoas: TotalPessoa[]; totalGeral: TotalGeral }>('/Relatorios/pessoas');
}

export function totaisPorCategoria() {
  return request<{ categorias: TotalPessoa[]; totalGeral: TotalGeral }>('/Relatorios/categorias');
}