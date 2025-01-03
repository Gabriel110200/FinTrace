import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  @ViewChild('conteudoPDF', {static:false}) el!: ElementRef

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  home(){
    this.router.navigate(['/'])
  }

  /*criarHtMlPDF() {
    const canvas1 = document.getElementById("categoria");
    const canvas2 = document.getElementById("caixa");
    const pdf = new jsPDF('p', 'mm', 'a4');

    if (canvas1 && canvas2) {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let currentHeight = 0; // Variável para rastrear a altura atual no PDF

      // Renderizar o primeiro canvas
      html2canvas(canvas1, {
        backgroundColor: null,
        scale: 2
      }).then((canvas1Result) => {
        const imgData1 = canvas1Result.toDataURL('image/png');
        const imgHeight1 = (canvas1Result.height * pdfWidth) / canvas1Result.width;

        // Adicionar a primeira imagem ao PDF
        pdf.addImage(imgData1, 'PNG', 0, currentHeight, pdfWidth, imgHeight1);
        currentHeight += imgHeight1 + 10; // Atualizar altura disponível com margem de 10mm

        // Renderizar o segundo canvas
        return html2canvas(canvas2, {
          backgroundColor: null,
          scale: 2
        });
      }).then((canvas2Result) => {
        const imgData2 = canvas2Result.toDataURL('image/png');
        const imgHeight2 = (canvas2Result.height * pdfWidth) / canvas2Result.width;

        // Verificar se há espaço suficiente na página atual
        if (currentHeight + imgHeight2 > pdfHeight) {
          pdf.addPage(); // Adicionar nova página se não houver espaço
          currentHeight = 0; // Resetar altura para a nova página
        }

        // Adicionar a segunda imagem ao PDF
        pdf.addImage(imgData2, 'PNG', 0, currentHeight, pdfWidth, imgHeight2);

        // Salvar o PDF
        pdf.save('graficos.pdf');
      }).catch((error) => {
        console.error('Erro ao exportar gráfico para PDF:', error);
      });
    } else {
      console.error('Um ou mais elementos canvas não foram encontrados.');
    }
  }*/

    /*criarHtMlPDF() {
      const canvas1 = document.getElementById("categoria");
      const canvas2 = document.getElementById("caixa");
      const resumo = document.getElementById("resumo");
      const pdf = new jsPDF('p', 'mm', 'a4');

      if (canvas1 && canvas2 && resumo) {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        let currentHeight = 0; // Controle da altura no PDF

        // Renderizar e adicionar o primeiro gráfico
        html2canvas(canvas1, {
          backgroundColor: null,
          scale: 2
        }).then((canvas1Result) => {
          const imgData1 = canvas1Result.toDataURL('image/png');
          const imgHeight1 = (canvas1Result.height * pdfWidth) / canvas1Result.width;

          pdf.addImage(imgData1, 'PNG', 0, currentHeight, pdfWidth, imgHeight1);
          currentHeight += imgHeight1 + 10; // Atualizar altura disponível

          // Renderizar e adicionar o segundo gráfico
          return html2canvas(canvas2, {
            backgroundColor: null,
            scale: 2
          });
        }).then((canvas2Result) => {
          const imgData2 = canvas2Result.toDataURL('image/png');
          const imgHeight2 = (canvas2Result.height * pdfWidth) / canvas2Result.width;

          if (currentHeight + imgHeight2 > pdfHeight) {
            pdf.addPage(); // Adicionar nova página se necessário
            currentHeight = 0;
          }
          pdf.addImage(imgData2, 'PNG', 0, currentHeight, pdfWidth, imgHeight2);
          currentHeight += imgHeight2 + 10;

          // Renderizar e adicionar o conteúdo da div resumo
          return html2canvas(resumo, {
            backgroundColor: null,
            scale: 2
          });
        }).then((resumoResult) => {
          const resumoData = resumoResult.toDataURL('image/png');
          const resumoHeight = (resumoResult.height * pdfWidth) / resumoResult.width;

          if (currentHeight + resumoHeight > pdfHeight) {
            pdf.addPage(); // Adicionar nova página se necessário
            currentHeight = 0;
          }
          pdf.addImage(resumoData, 'PNG', 0, currentHeight, pdfWidth, resumoHeight);

          // Salvar o PDF
          pdf.save('graficos_resumo.pdf');
        }).catch((error) => {
          console.error('Erro ao exportar para PDF:', error);
        });
      } else {
        console.error('Um ou mais elementos não foram encontrados.');
      }
    }*/


    criarHtMlPDF() {
      const canvas1 = document.getElementById("categoria");
      const canvas2 = document.getElementById("caixa");
      const resumo = document.getElementById("resumo");
      const pdf = new jsPDF('p', 'mm', 'a4');

      if (canvas1 && canvas2 && resumo) {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        let currentHeight = 10; // Controle da altura no PDF

        // Adicionar título "Despesas por categoria"
        pdf.setFontSize(16);
        pdf.text("Despesas por Categoria", 10, currentHeight);
        currentHeight += 10; // Ajustar a altura após o título

        // Renderizar e adicionar o primeiro gráfico (Canvas1)
        html2canvas(canvas1, {
          backgroundColor: null,
          scale: 2
        }).then((canvas1Result) => {
          const imgData1 = canvas1Result.toDataURL('image/png');
          const imgHeight1 = (canvas1Result.height * pdfWidth) / canvas1Result.width;

          pdf.addImage(imgData1, 'PNG', 0, currentHeight, pdfWidth, imgHeight1, '', 'FAST');
          currentHeight += imgHeight1 + 10; // Atualizar altura disponível após o gráfico

          // Adicionar título "Fluxo de Caixa"
          pdf.setFontSize(16);
          pdf.text("Fluxo de Caixa", 10, currentHeight);
          currentHeight += 10; // Ajustar a altura após o título

          // Renderizar e adicionar o segundo gráfico (Canvas2)
          return html2canvas(canvas2, {
            backgroundColor: null,
            scale: 2
          });
        }).then((canvas2Result) => {
          const imgData2 = canvas2Result.toDataURL('image/png');
          const imgHeight2 = (canvas2Result.height * pdfWidth) / canvas2Result.width;

          if (currentHeight + imgHeight2 > pdfHeight) {
            pdf.addPage(); // Adicionar nova página se necessário
            currentHeight = 10;
          }
          pdf.addImage(imgData2, 'PNG', 0, currentHeight, pdfWidth, imgHeight2, '', 'FAST');
          currentHeight += imgHeight2 + 10; // Atualizar altura disponível após o gráfico

          // Renderizar e adicionar o conteúdo do resumo (div resumo)
          return html2canvas(resumo, {
            backgroundColor: null,
            scale: 2
          });
        }).then((resumoResult) => {
          const resumoData = resumoResult.toDataURL('image/png');
          const resumoHeight = (resumoResult.height * pdfWidth) / resumoResult.width;

          if (currentHeight + resumoHeight > pdfHeight) {
            pdf.addPage(); // Adicionar nova página se necessário
            currentHeight = 10;
          }

          // Adicionar título "Resumo Financeiro Mensal"
          pdf.setFontSize(16);
          pdf.text("Resumo Financeiro Mensal", 10, currentHeight);
          currentHeight += 10; // Ajustar a altura após o título

          pdf.addImage(resumoData, 'PNG', 0, currentHeight, pdfWidth, resumoHeight, '', 'FAST');

          // Salvar o PDF
          pdf.save('graficos_resumo.pdf');
        }).catch((error) => {
          console.error('Erro ao exportar para PDF:', error);
        });
      } else {
        console.error('Um ou mais elementos não foram encontrados.');
      }
    }





}
