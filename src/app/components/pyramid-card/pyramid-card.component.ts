import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pyramid } from 'src/app/models/pyramid';
import * as lodash from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PyramidCardFormValidator } from './pyramid-card-form-validator';

@Component({
  selector: 'app-pyramid-card',
  templateUrl: './pyramid-card.component.html',
  styleUrls: ['./pyramid-card.component.scss']
})
export class PyramidCardComponent implements OnInit {

  pyramid: Pyramid;
  formGroup: FormGroup;
  formValidator: PyramidCardFormValidator;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: Pyramid, public dialogRef: MatDialogRef<Pyramid>,
   private formBuilder: FormBuilder) {
    this.pyramid = this.dialogData;
    this.formValidator = new PyramidCardFormValidator(this.formBuilder, this.dialogData);
    this.formGroup = this.formValidator.formGroup;
  }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(res => {
      console.log('before close')
    })
  }

  /*
  onButtonValueSelected(pyramidConfirmed: boolean) {
    if (pyramidConfirmed) {
      this.dialogRef.close(<Pyramid>this.dialogData);
    } else {
      this.dialogRef.close();
    }
  }
  */

}
