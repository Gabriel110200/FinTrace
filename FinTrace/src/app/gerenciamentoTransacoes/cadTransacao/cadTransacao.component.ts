import { Component, OnInit, Inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { Categoria } from "src/app/gerenciamentoCategorias/model/categoria"
import { Metas } from "src/app/gerenciamentoMetas/model/Metas"
import { Transacao } from "../model/transacao"
import { TransacoesService } from "../service/transacoes.service"


@Component({
  selector: 'app-cadTransacao',
  templateUrl: './cadTransacao.component.html',
  styleUrls: ['./cadTransacao.component.css']
})
export class CadTransacaoComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'
  desabilita:boolean = false
  recorrente = this.data.recorrente ?? null
  editar:boolean = this.data.editar ?? null
  datas:number[] = []
  moedas: string[] = this.service.obterMoedas()
  formulario:any = this.data.form
  tipoCategoria:Categoria[] = this.data.categoria ?? []
  tipoMeta:Metas[] = this.data.metas ?? []

  tipoTransacao:any[] = [
    {id:'RECEITA', nome: 'Receita'},
    {id:'DESPESA', nome: 'Despesa'},
  ]

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadTransacaoComponent>,
    private service: TransacoesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      tipoTransacao: [null, [Validators.required]],
      moeda: [null],
      categoria: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required, this.dataValidaValidator]],
      descricao: [null],
    })

    this.cadastro.patchValue({
      moeda: "Real (BRL)"
    })
  }

  enviarTransacao(){
    const moeda = this.cadastro.get('moeda')?.value

    const transacao:Transacao = {
      type: this.cadastro.get('tipoTransacao')?.value,
      category: this.cadastro.get('categoria')?.value,
      amount: this.cadastro.get('valor')?.value,
      date: this.cadastro.get('data')?.value,
      description: this.cadastro.get('descricao')?.value,
      recurring: this.recorrente ? true : false
    }

    transacao.amount = this.service.realizaCotacao(transacao.amount,moeda)

    this.dialogRef.close(transacao)
  }

  atualizaCampos(){
    this.cadastro.patchValue({
      tipoTransacao: this.formulario.tipoTransacao,
      categoria: this.formulario.categoria,
      valor: this.formulario.valor,
      data: this.formulario.dataTransacao,
      descricao: this.formulario.descricao,
    })
  }

  dataValidaValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const data = new Date(value);
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();

    if (dia !== new Date(ano, mes, dia).getDate()) {
      return { dataInvalida: true };
    }

    return null;
  }



}
