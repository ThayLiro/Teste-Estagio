import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddPessoaPageRoutingModule } from './add-pessoa-routing.module';
import { BrMaskerModule } from 'br-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { AddPessoaPage } from './add-pessoa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPessoaPageRoutingModule,
    BrMaskerModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  declarations: [AddPessoaPage]
})
export class AddPessoaPageModule {}
