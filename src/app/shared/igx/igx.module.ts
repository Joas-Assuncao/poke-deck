import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IgxButtonModule,
  IgxCardModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRippleModule,
  IgxToastModule,
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
    IgxTooltipModule,
    IgxToastModule,
  ],
  exports: [
    CommonModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxInputGroupModule,
    IgxIconModule,
    IgxTooltipModule,
    IgxToastModule,
  ],
})
export class IgxModule {}
