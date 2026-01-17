export const TipoTransacao = {
  Despesa: 0,
  Receita: 1,
} as const;

export type TipoTransacao =
  (typeof TipoTransacao)[keyof typeof TipoTransacao];

import type Pessoa from './Pessoa';
import type { Categoria } from './Categoria';

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
  pessoa?: Pessoa;
  categoria?: Categoria;
}