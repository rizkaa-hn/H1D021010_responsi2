import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.page.html',
  styleUrls: ['./kontak.page.scss'],
})
export class KontakPage implements OnInit {
  dataKontak: any = [];
  id: number | null = null;
  nama: string = '';
  no_hp: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.getKontak();
  }

  getKontak() {
    this._apiService.tampil('tampil_kontak.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataKontak = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.no_hp = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilKontak(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahKontak() {
    if (this.nama != '' && this.no_hp != '') {
      let data = {
        nama: this.nama,
        no_hp: this.no_hp,
      };
      this._apiService.tambah(data, '/tambah_kontak.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah kontak');
          this.getKontak();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah kontak');
        },
      });
    } else {
      console.log('gagal tambah kontak karena masih ada data yg kosong');
    }
  }

  hapusKontak(id: any) {
    this._apiService.hapus(id, '/hapus_kontak.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getKontak();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilKontak(id: any) {
    this._apiService.lihat(id, '/lihat_kontak.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let kontak = hasil;
        this.id = kontak.id;
        this.nama = kontak.nama;
        this.no_hp = kontak.no_hp;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editKontak() {
    let data = {
      id: this.id,
      nama: this.nama,
      no_hp: this.no_hp,
    };
    this._apiService.edit(data, '/edit_kontak.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getKontak();
        console.log('berhasil edit Kontak');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Kontak');
      },
    });
  }
}