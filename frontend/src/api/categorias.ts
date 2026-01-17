import { request } from './http';
import type { Categoria } from '../types/Categoria';

export function listarCategorias() {
  return request<Categoria[]>('/Categorias');
}

export function criarCategoria(categoria: Omit<Categoria, 'id'>) {
  return request<Categoria>('/Categorias', {
    method: 'POST',
    body: JSON.stringify(categoria),
  });
}