import { categoria } from "src/app/gerenciamentoCategorias/model/categoria"

export interface transacaoRecorrente{
    type: string,
    category: categoria
    amount: number,
    date?: string,
    description: string
    day: number
}