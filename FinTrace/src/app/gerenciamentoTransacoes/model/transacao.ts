import { categoria } from "src/app/gerenciamentoCategorias/model/categoria"


export interface transacao{
    type: string,
    category: categoria
    amount: number,
    date: string,
    description: string
    recurring: boolean
}

export interface cadTransacao{
  userId: number,
  categoryId: number | undefined,
  type: string,
  amount: number,
  date: string,
  description: string,
  recurring: boolean
}

