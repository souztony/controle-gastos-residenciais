export type Finalidade = 'Despesa' | 'Receita' | 'Ambas';

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: Finalidade;
}