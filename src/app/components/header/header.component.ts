import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IgxModule } from 'src/app/shared/igx/igx.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IgxModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() title!: string;
}
