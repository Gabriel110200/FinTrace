import { Categoria } from "src/app/gerenciamentoCategorias/model/categoria"

export interface TransacaoRecorrente{
    type: string,
    category: Categoria
    amount: number,
    date?: string,
    description: string
    day: number
}
