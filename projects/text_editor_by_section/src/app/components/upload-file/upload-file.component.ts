import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import { concatMap, last } from 'rxjs/operators';
import { NotificationService } from '../../core/core.module';
import { Cadeau, CadeauxService } from '../../services/cadeaux.service';
import { MyErrorStateMatcher } from '../email/email.component';

@Component({
  selector: 'anms-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  imageUrl: any;

  nomFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  pcChange$: any;

  constructor(
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private cadeauxService: CadeauxService
  ) {}

  ngOnInit(): void {}

  fileChange = event => {
    let file: File = event.target.files[0];

    let filePath = `courses/test/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: 'max-age=2592000,public'
    });

    this.pcChange$ = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      )
      .subscribe(data => {
        console.log('upload', data);
        this.imageUrl = data;
      });
  };

  onSubmit = () => {
    if (this.cadeauxService.nomSelected) {
      let cadeau = new Cadeau(
        this.cadeauxService.nomSelected,
        this.nomFormControl.value,
        this.imageUrl
      );
      this.cadeauxService.add_cadeau(cadeau).then((data)=>{

        

      });
    } else {
      this.notificationService.error('Vous devez choisi un nom');
    }
  };
}
