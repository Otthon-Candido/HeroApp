import { Component } from '@angular/core';
import { SuperPowerService } from '../super-powers.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SuperPower } from '../super-powers.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-super-powers-form',
  templateUrl: './super-powers-form.component.html',
  styleUrls: ['./super-powers-form.component.scss'],
})
export class SuperPowersFormComponent {
  form!: UntypedFormGroup;
  actionName: string = 'Editar Super Poder';
  constructor(
    private superPowerService: SuperPowerService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData() {
    this.loadingService.show('Buscando dados');
    await Promise.all([this._createForm(), this._getSuperPowerById()])
      .then(() => {
        this.verifyAction();
      })
      .catch((error) => {
        this.notification.Clear();
        this.notification.Error(error, 'Erro');
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  private _createForm(): void {
    this.form = this.formBuilder.group({
      id: [0],
      description: ['', Validators.required],
      superPower: ['', Validators.required],
    });
  }

  private async _getSuperPowerById() {
    let id = this.route.snapshot.params['id'];
    try {
      await this.superPowerService
        .getSuperPowerById(id)
        .toPromise()
        .then((response) => {
          if (response) this.form.patchValue(response);
        });
    } catch (error) {}
  }

  verifyAction(): void {
    let id = this.route.snapshot.params['id'];
    if (id == 0) {
      this.actionName = 'Inserir Super Poder';
    } else {
      this.actionName = 'Editar Super Poder';
    }
  }

  async save() {
    const form = this.form.getRawValue();
    let t = { ...form } as SuperPower;
    let id = this.route.snapshot.params['id'];
    if (id != 0) {
      try {
        this.loadingService.show("Atualizando Super Poderes")
        await this.superPowerService.updateSuperPower(t).toPromise();
        this.notification.Success("Atualizado com Sucesso","Sucesso")
      } catch (error:any) {
        if (error.status == 400) {
          this.notification.Error(error.error.ResponseText, 'Erro');
        } else {
          this.notification.Error('Aconteceu algum erro inesperado', 'Erro');
        }
      }
      finally{
        this.loadingService.hide();
      }
    } else if (id == 0) {
      try {
        this.loadingService.show("Inserindo Super Poderes")
        await this.superPowerService.saveSuperPower(t).toPromise();
        this.notification.Success("Inserido com Sucesso","Sucesso")
      } catch (error:any) {
        if (error.status == 400) {
          this.notification.Error(error.error.ResponseText, 'Erro');
        } else {
          this.notification.Error('Aconteceu algum erro inesperado', 'Erro');
        }
      }
      finally{
        this.loadingService.hide();
      }
    }
  }

  back() {
    this.router.navigate(['/super-power']);
  }
}
