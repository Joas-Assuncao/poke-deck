import { Component, Input } from '@angular/core';
import { IgxModule } from 'src/app/shared/igx/igx.module';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IgxModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css'],
})
export class EmptyStateComponent {
  @Input() title: string = 'dado';
}
