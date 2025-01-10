import { Categoria } from "src/app/gerenciamentoCategorias/model/categoria"

export interface Transacao{
    type: string,
    category: Categoria
    amount: number,
    date: string,
    description: string
    recurring: boolean
}

export interface CadTransacao{
  userId: number,
  categoryId: number | undefined | null,
  type: string,
  amount: number,
  date: string,
  description: string,
  goalId: number | undefined | null,
  recurring: boolean
}

