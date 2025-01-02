import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../app/core/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Data Seeder';
  firstFormGroup;
  secondFormGroup;
  thirdFormGroup;

  constructor(
    private apiService: ApiService, 
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFileSelected(event: any, step: number) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
        this._snackBar.open('Please upload only CSV files', 'Close', {
          duration: 3000,
        });
        return;
      }
      // Handle file upload
      console.log(`File selected for step ${step}:`, file);
    }
  }

  downloadTemplate(step: number) {
    this.apiService.downloadTemplate(step).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `template-step-${step}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this._snackBar.open('Failed to download template', 'Close', {
          duration: 3000,
        });
        console.error('Download error:', error);
      }
    });
  }

  onButtonClick() {
    console.log('Button clicked!');
  }
}
