import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Categoria } from "../gerenciamentoCategorias/model/categoria";
import { CategoriaService } from "../gerenciamentoCategorias/service/categoria.service";
import { CadTransacaoComponent } from "./cadTransacao/cadTransacao.component";
import { TransacoesService } from "./service/transacoes.service";
import { TabelaTransacoesComponent } from "./tabelaTransacoes/tabelaTransacoes.component";


@Component({
  selector: 'app-gerenciamentoTransacoes',
  templateUrl: './gerenciamentoTransacoes.component.html',
  styleUrls: ['./gerenciamentoTransacoes.component.css']
})
export class GerenciamentoTransacoesComponent implements OnInit {

  @Input()
  requiredFileType!:string;

  pesquisa!:FormGroup

  tipoTransacao:any[] = [
    {id:'RECEITA', nome: 'Receita'},
    {id:'DESPESA', nome: 'Despesa'},
  ]

  get$!:Subscription
  put$!:Subscription
  post$!:Subscription

  tipoCategoria!:Categoria[]

  fileName = '';
  base64!:string | undefined
  envioArquivo$!: Subscription

  meses:any[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  anos:number[] = []


  @ViewChild(TabelaTransacoesComponent)tabela!: TabelaTransacoesComponent

  constructor(
    private dialog: MatDialog,
    private form: FormBuilder,
    private router: Router,
    protected service: TransacoesService,
    private toast: ToastrService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {

    this.pesquisa = this.form.group({
      transacao: [null],
      categoria: [null],
      dataInicio: [null],
      dataFim: [null],
      mes: [null, [Validators.required]],
      ano: [null, [Validators.required]]

    })

    setTimeout(()=> {
      this.listarCategorias()
      this.criaAnos()
      this.tabela?.recuperarTransacoes()
    }, 0)
  }

  listarCategorias(){
    this.get$ = this.categoriaService.listarCategorias().subscribe(
      (dado) => {
        this.tipoCategoria = dado
      }
    )
  }

  obtemDespesa(){
    const item = this.tabela?.retornaRegistros()
    if(item?.length > 0){
      return this.service.retornaTotalDespesa(item)
    }else{
      return 0
    }
  }

  obtemReceita(){
    const item = this.tabela?.retornaRegistros()
    //console.log('item>', item)
    //console.log(item?.length > 0)
    if(item?.length > 0){
      return this.service.retornaTotalReceita(item)
    }else{
      return 0
    }
  }

  obtemSaldo(){
    const receita = this.obtemReceita()
    const despesa = this.obtemDespesa()
    return parseFloat(receita.toFixed(2)) - parseFloat(despesa.toFixed(2))
  }

  criaAnos(){
    const data = new Date()
    const anoAtual = data.getFullYear()

    for (let i = 0; i < 20; i++) {
      this.anos.push(anoAtual - i);
    }
  }

  pesquisar(){
    this.tabela?.pesquisar(this.pesquisa.value)
    this.pesquisa.reset()
  }

  resetar(){
    this.pesquisa.reset()
    this.pesquisa.markAsPristine()
    this.tabela?.reiniciar()
  }

  home(){
    this.router.navigate(['/'])
  }

  dialogTransacao(acao:string){

    if(acao=='recorrente'){
      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          recorrente: acao,
          acaoTitulo: 'Cadastro',
          categoria: this.tipoCategoria
        }
      })

      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          console.log('recorrente:',val)
          this.tabela?.adicionaRecorrente(val)
        }
      })

    } else {
      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          recorrente: null,
          acaoTitulo: 'acao',
          categoria: this.tipoCategoria
        }
      })

      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          this.tabela?.adicionaRegistro(val)
        }
      })

    }
  }

  onFileSelected(event: any) {
    console.log('abri file selected')

    const files: FileList = event.target.files;

    console.log('debug file', files)

    // Convertendo o FileList para um array para permitir iteração
    const filesArray = Array.from(files);

    for (const element of filesArray) {
      const file: File = element;
      this.fileName = file.name;
      const extensao = this.retornaExtensao(file.name);

      if (file.size > 1000000) {
        this.toast.error(`Arquivo deve ser menor do que 5MB - ${file.name}`);
      }
      else if (extensao?.toLowerCase() !== 'csv') {
        this.toast.error(`Extensão do arquivo não suportada - ${file.name}`);
      } else {
        const formData = new FormData();
        formData.append('file', file);

        console.log(formData);

        this.post$ = this.service.importarTransacoes(formData).subscribe(
          (dado) => {
            console.log(dado);
            this.toast.success('Transações adicionadas com sucesso!');
            this.tabela?.recuperarTransacoes();
          }
        );
      }
    }
  }

  retornaExtensao(nome:string){
    const ext = nome.split(/[.]/g)
    return ext[1]
  }

}
