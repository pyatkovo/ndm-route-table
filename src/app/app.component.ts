import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteTableComponent } from './route-table/route-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouteTableComponent],
  template: `<app-route-table />`,
})
export class AppComponent {}
