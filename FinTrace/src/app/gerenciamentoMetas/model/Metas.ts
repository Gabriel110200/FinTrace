import { Transacao } from "src/app/gerenciamentoTransacoes/model/transacao";
export interface Metas{
  id?: number,
  description: string,
  necessaryValue: number,
  currentValue?: number,
  transactions?: Transacao[]
}

export interface PostMetas{
  userId: number,
  id?:number,
  description: string,
  necessaryValue: number,
}
