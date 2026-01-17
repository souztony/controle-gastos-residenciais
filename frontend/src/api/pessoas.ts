import { request } from './http';
import type Pessoa from '../types/Pessoa';

export function listarPessoas() {
  return request<Pessoa[]>('/Pessoas');
}

export function criarPessoa(pessoa: Omit<Pessoa, 'id'>) {
  return request<Pessoa>('/Pessoas', {
    method: 'POST',
    body: JSON.stringify(pessoa),
  });
}

export function deletarPessoa(id: number) {
  return request<void>(`/Pessoas/${id}`, {
    method: 'DELETE',
  });
}