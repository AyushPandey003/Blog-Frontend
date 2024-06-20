import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule, } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, MatSlideToggleModule,MatToolbarModule,MatIconModule,RouterLink,RouterLinkActive,RouterOutlet, MatButtonModule,MatSnackBarModule,MatCardModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatChipsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}
)

export class AppComponent {
  title = 'Blog-Frontend';
}
