import { request } from './http';
import type { Transacao } from '../types/Transacao';

export type CriarTransacaoRequest = Omit<Transacao, 'id'>;

export function listarTransacoes() {
  return request<Transacao[]>('/Transacoes');
}

export function criarTransacao(transacao: CriarTransacaoRequest) {
  return request<Transacao>('/Transacoes', {
    method: 'POST',
    body: JSON.stringify(transacao),
  });
}