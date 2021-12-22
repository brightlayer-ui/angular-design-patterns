import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { StateService } from '../../../services/state.service';
import {MatCheckboxChange} from "@angular/material/checkbox";
@Component({
  selector: 'app-multiselect-list',
  templateUrl: './multiselect-list.component.html',
  styleUrls: ['./multiselect-list.component.scss'],
})
export class MultiselectListComponent implements OnInit {

  todayData = ['High Humidity', 'Battery Service', 'Bypass Over Frequency'];
  yesterdayData = [ 'High Humidity', 'Battery Service'];

  selectedToday: Set<string> = new Set();
  selectedYesterday: Set<string> = new Set();
  isSmall: boolean;

  constructor(
    private readonly _drawerService: StateService,
    private readonly _breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this._breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
  }


  toggleMenu(): void {
    const drawerOpen = this._drawerService.getDrawerOpen();
    this._drawerService.setDrawerOpen(!drawerOpen);
  }

  deleteSelected(): void {

  }

  showIndeterminant(selected: Set<string>, data: string[]): boolean {
    return selected.size > 0 && selected.size < data.length;
  }

  toggleAll(e: MatCheckboxChange, data: string[], set: Set<string>): void {
    if (e.checked) {
      data.map((entry) => set.add(entry));
    }  else {
      data.map((entry) => set.delete(entry));
    }
  }

  toggle(e: MatCheckboxChange, key: string, set: Set<string>): void {
    if (e.checked) {
      set.add(key);
    } else {
      set.delete(key);
    }
  }
}
