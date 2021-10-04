import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';
@Component({
    selector: 'app-sectioned-form',
    templateUrl: './sectioned-form.component.html',
    styleUrls: ['./sectioned-form.component.scss'],
})
export class SectionedFormComponent implements OnInit {
    isSmall: boolean;
    factoryDetailsForm: FormGroup;
    levels: any[] = [
        { value: 'level-1', viewValue: 'Level I (Regional)' },
        { value: 'level-2', viewValue: 'Level II (Regional)' },
        { value: 'level-3', viewValue: 'Level III (Regional)' },
    ];
    states: any[] = [
        { value: 'CA', viewValue: 'CA' },
        { value: 'MI', viewValue: 'MI' },
        { value: 'GA', viewValue: 'GA' },
    ];
    sideNavContainer: Element;
    @ViewChild('sectionedForm') sectionedForm: NgForm;
    constructor(
        private readonly _drawerService: StateService,
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _formBuilder: FormBuilder,
        private readonly _el: ElementRef
    ) {
        this.initForm();
    }

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
        this.sideNavContainer = document.getElementsByTagName('mat-sidenav-content')[0];
    }

    initForm(): void {
        this.factoryDetailsForm = this._formBuilder.group({
            factoryName: ['', Validators.required],
            levelOption: ['level-2', Validators.required],
            pxbProtectionChecked: [false],
            addressOne: ['', Validators.required],
            addressTwo: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            country: [{ value: 'United States', disabled: true }, [Validators.required]],
            contactName: ['', Validators.required],
            contactLastName: [''],
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
                ]),
            ],
        });
    }

    toggleMenu(): void {
        const drawerOpen = this._drawerService.getDrawerOpen();
        this._drawerService.setDrawerOpen(!drawerOpen);
    }

    getTopOffset(controlEl: HTMLElement): number {
        const labelOffset = this.isSmall ? 56 : 64;
        return controlEl.getBoundingClientRect().top + this.sideNavContainer.scrollTop - labelOffset;
    }

    scrollSideNavContainer(value: number): void {
        this.sideNavContainer.scroll({
            top: value,
            left: 0,
            behavior: 'smooth',
        });
    }

    matcher(event: KeyboardEvent): void {
        const allowedRegex = /[0-9]/g;
        if (!event.key.match(allowedRegex)) {
            event.preventDefault();
        }
    }

    submit(): void {
        const firstInvalidControl = this._el.nativeElement.querySelector('form .ng-invalid');
        if (firstInvalidControl) {
            const topOffset = this.getTopOffset(firstInvalidControl);
            this.scrollSideNavContainer(topOffset);
            firstInvalidControl.querySelector('form .ng-invalid').focus();
        } else {
            this.factoryDetailsForm.reset();
            this.sectionedForm.resetForm();
            this.initForm();
            this.scrollSideNavContainer(0);
        }
    }
}
