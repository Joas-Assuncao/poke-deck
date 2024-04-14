import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IgxButtonModule,
  IgxCardModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRippleModule,
  IgxTooltipModule,
} from 'igniteui-angular';

@NgModule({
  imports: [
    CommonModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxInputGroupModule,
    IgxIconModule,
    IgxTooltipModule
  ],
  exports: [
    CommonModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxInputGroupModule,
    IgxIconModule,
    IgxTooltipModule
  ],
})
export class IgxModule {}
