import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-or-deny-buttons',
  templateUrl: './confirm-or-deny-buttons.component.html',
  styleUrls: ['./confirm-or-deny-buttons.component.scss']
})
export class ConfirmOrDenyButtonsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }, public dialogRef: MatDialogRef<boolean>) { }

  @Output() valueSelected: EventEmitter<boolean> = new EventEmitter(null);

  confirm() {
    this.valueSelected.emit(true);
    this.dialogRef.close(true);
  }

  deny() {
    this.valueSelected.emit(false);
    this.dialogRef.close(false);
  }

}
