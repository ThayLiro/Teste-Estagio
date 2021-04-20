import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.page.html',
  styleUrls: ['./pessoa.page.scss'],
})
export class PessoaPage implements OnInit {

  pessoas: any[] = [];
  
  constructor(public alertController: AlertController, private navController: NavController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.pessoas = JSON.parse(localStorage.getItem('pessoaBD'));
    if(!this.pessoas){
      this.pessoas = []
      localStorage.setItem('pessoaBD', JSON.stringify(this.pessoas));
    }
  }

  async excluir(id: number){
    let pessoa: any[] = null;
    pessoa = this.pessoas.filter( (temp)=>{return temp.id === id});
    this.confirmarExclusao(pessoa[0]);    
  }

  async confirmarExclusao(pessoa: any){
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: pessoa.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Excluir',
          cssClass: 'danger',
          handler: () => {
            this.pessoas = JSON.parse(localStorage.getItem('pessoaBD'));
            this.pessoas = this.pessoas.filter((temp)=>{return temp.id != pessoa.id});
            localStorage.setItem('pessoaBD', JSON.stringify(this.pessoas));
            this.navController.navigateBack('/pessoa');
            this.exibirMensagem();
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(){
    const toast = await this.toastController.create({
      message:' Registro excluido com sucesso!',
      duration: 1500
    });
    toast.present();
  }

}
