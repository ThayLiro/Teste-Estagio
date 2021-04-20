import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CepService } from 'src/app/services/cep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.page.html',
  styleUrls: ['./add-pessoa.page.scss'],
})
export class AddPessoaPage implements OnInit {
  id: string;
  pessoas: any = [];
  pessoa: any = {
    id: null,
    nome: null,
    sobrenome: null,
    cpf: null,
    telefone: null,
    endereco: {
      cep:null,
      rua: null,
      bairro: null,
      cidade: null,
      estado: null
    },
  };
  endereco: any = {
    logradouro: null,
    bairro: null,
    localidade: null,
    uf: null,
  };

  public formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public toastController: ToastController, private formBuilder: FormBuilder, private cepService: CepService) {
    this.formGroup = this.formBuilder.group({
        'nome':['', Validators.compose([
          Validators.required
        ])],
        'sobrenome':['', Validators.compose([
          Validators.required
        ])],
        'telefone':['', Validators.compose([
          Validators.required
        ])],
        'cep':['', Validators.compose([
          Validators.required
        ])],
        'cpf':['', Validators.compose([
          Validators.required
        ])],
        'rua':['', Validators.compose([
          Validators.required
        ])],
        'bairro':['', Validators.compose([
          Validators.required
        ])],
        'cidade':['', Validators.compose([
          Validators.required
        ])],
        'estado':['', Validators.compose([
          Validators.required
        ])]
      })
  }  

  async preencherEndereco() {
    this.cepService.obterEndereco(this.formGroup.value.cep)
      .then((json) => {
        this.endereco = json;
        console.log(json);
        this.formGroup.get('rua').setValue(this.endereco.logradouro);
        this.formGroup.get('bairro').setValue(this.endereco.bairro);
        this.formGroup.get('cidade').setValue(this.endereco.localidade);
        this.formGroup.get('estado').setValue(this.endereco.uf);
      })
      .catch((erro) => {
        this.exibirMensagem('Erro ao consultar o CEP');
      });
  }

  ngOnInit() {
   
    this.pessoas = JSON.parse(localStorage.getItem('pessoaBD'));
    if (!this.pessoas) {
      this.pessoas = [];
      localStorage.setItem('pessoaBD', JSON.stringify(this.pessoas));
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.pessoa = this.pessoas[this.id];
    } else {
      this.pessoa.id = this.pessoas.length;
    }

        
      this.formGroup.get('nome').setValue(this.pessoa.nome);
      this.formGroup.get('sobrenome').setValue(this.pessoa.sobrenome);
      this.formGroup.get('cpf').setValue(this.pessoa.cpf);
      this.formGroup.get('telefone').setValue(this.pessoa.telefone);
      this.formGroup.get('cep').setValue(this.pessoa.endereco.cep);
      this.formGroup.get('rua').setValue(this.pessoa.endereco.rua);
      this.formGroup.get('bairro').setValue(this.pessoa.endereco.bairro);
      this.formGroup.get('cidade').setValue(this.pessoa.endereco.cidade);
      this.formGroup.get('estado').setValue(this.pessoa.endereco.estado);
   }


  async submitForm(){
    
    this.pessoa.nome = this.formGroup.value.nome;
    this.pessoa.cpf = this.formGroup.value.cpf;
    this.pessoa.sobrenome = this.formGroup.value.sobrenome;
    this.pessoa.telefone = this.formGroup.value.telefone;
    this.pessoa.endereco.cep = this.formGroup.value.cep;
    this.pessoa.endereco.rua = this.formGroup.value.rua;
    this.pessoa.endereco.bairro = this.formGroup.value.bairro;
    this.pessoa.endereco.cidade = this.formGroup.value.cidade;
    this.pessoa.endereco.estado = this.formGroup.value.estado;

    this.pessoas = JSON.parse(localStorage.getItem('pessoaBD'));

    if (this.id) {
      this.pessoas[this.id] = this.pessoa;
    } else {
      this.pessoas.push(this.pessoa);
    }

    localStorage.setItem('pessoaBD', JSON.stringify(this.pessoas));
    this.exibirMensagem('Registro salvo com sucesso!');
    this.navController.navigateBack('/pessoa');

  }

  async exibirMensagem(mensagem: string){
    const toast = await this.toastController.create({
      message:mensagem,
      duration: 1500
    });
    toast.present();
  }
  
}