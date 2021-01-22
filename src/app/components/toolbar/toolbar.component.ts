import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoutesPathEnum } from 'src/app/shared/constants';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  RoutesPathEnum = RoutesPathEnum;
  currentPath: string;

  constructor(private location: Location, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.location.onUrlChange(url => {
      const slashIndex = url.indexOf('/');
      this.currentPath = url.substring(slashIndex + 1);
    })
  }

  navigateBack() {
    this.location.back();
  }

  openConfig() {
    this.dialog.open(ConfigComponent);
  }

}
