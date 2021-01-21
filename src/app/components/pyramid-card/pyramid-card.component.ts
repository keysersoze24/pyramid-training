import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoublePyramid } from 'src/app/models/double-pyramid';
import { RestTime } from 'src/app/models/rest-time';
import * as lodash from 'lodash';

@Component({
  selector: 'app-pyramid-card',
  templateUrl: './pyramid-card.component.html',
  styleUrls: ['./pyramid-card.component.scss']
})
export class PyramidCardComponent implements OnInit {

  doublePyramid: DoublePyramid = new DoublePyramid(5, 1, new RestTime(2), true);

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DoublePyramid) {
    this.doublePyramid = lodash.cloneDeep(dialogData);
  }

  ngOnInit(): void {
  }

}
