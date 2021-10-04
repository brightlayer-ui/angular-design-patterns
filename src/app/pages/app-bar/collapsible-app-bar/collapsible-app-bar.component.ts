import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-collapsible-app-bar',
    templateUrl: './collapsible-app-bar.component.html',
    styleUrls: ['./collapsible-app-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CollapsibleAppBarComponent implements OnInit {
    isCollapsed: boolean;
    isSmall: boolean;
    scrollElement = { name: 'mat-drawer-content', index: 0 };

    constructor(
        private readonly _ref: ChangeDetectorRef,
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

    setCollapsed(isCollapsed: boolean): void {
        this.isCollapsed = isCollapsed;
        this._ref.detectChanges();
    }
}
