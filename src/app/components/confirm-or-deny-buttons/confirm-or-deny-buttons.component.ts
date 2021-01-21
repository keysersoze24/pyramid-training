import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-or-deny-buttons',
  templateUrl: './confirm-or-deny-buttons.component.html',
  styleUrls: ['./confirm-or-deny-buttons.component.scss']
})
export class ConfirmOrDenyButtonsComponent {

  constructor() { }

  @Output() valueSelected: EventEmitter<boolean> = new EventEmitter(null);



}
