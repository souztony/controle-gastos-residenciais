import { request } from './http';
import { Transacao } from '../types/Transacao';

export function listarTransacoes() {
  return request<Transacao[]>('/Transacoes');
}

export function criarTransacao(transacao: Omit<Transacao, 'id'>) {
  return request<Transacao>('/Transacoes', {
    method: 'POST',
    body: JSON.stringify(transacao),
  });
}