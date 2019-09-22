import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  closeBtnName: string;
  message: string = '';
  status: string ='';

  constructor(public bsModalRef2: BsModalRef ) { }

  ngOnInit() {
  }

}
