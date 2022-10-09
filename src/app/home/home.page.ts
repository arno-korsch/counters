import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes = [];
  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res =>{
      console.log(res);
      this.notes = res;
    })
  }

  async openNote(note){
    console.log("openNote(note)");
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: note.id},
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  async addNote(){

    console.log('Add-Note');
    const alert = await this.alertCtrl.create({
      header: 'Add Note', 
      inputs: [
        {
          name: 'title',
          placeholder: 'My Cool Note',
          type: 'textarea'
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({title: res.title, text: res.text});
          },
        }

      ]
    })  ;
    await alert.present();  
  }
}
