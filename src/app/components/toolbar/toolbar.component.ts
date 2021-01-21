import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPathEnum } from 'src/app/shared/constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  RoutesPathEnum = RoutesPathEnum;
  currentPath: string;

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {

    this.location.onUrlChange(url => {
      const slashIndex = url.indexOf('/');
      this.currentPath = url.substring(slashIndex + 1);
    })
  }

  navigateBack() {
    this.location.back();
  }

}
