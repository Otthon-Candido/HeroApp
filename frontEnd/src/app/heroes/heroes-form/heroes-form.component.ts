import { Component } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperPowerService } from 'src/app/super-powers/super-powers.service';
import { Heroes } from '../heroes.model';
import { HeroesService } from '../heroes.service';
import { SuperPower } from 'src/app/super-powers/super-powers.model';
import * as moment from 'moment';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss'],
})
export class HeroesFormComponent {
  form!: UntypedFormGroup;
  actionName: string = 'Editar Herói';
  superPowerList!: SuperPower[];
  toppings = new FormControl();
  toppingList: any[] = [];
  dataSelecionada: any;
  constructor(
    private superPowerService: SuperPowerService,
    private heroesService: HeroesService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private notification: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAllData();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async loadAllData() {
    this.loadingService.show('Buscando dados');
    await Promise.all([
      this._createForm(),
      this.getDataSuperPower(),
      this._getSuperPowerById(),
    ])
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
  initiallySelectedToppings: string[] = [];
  private _createForm(): void {
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      heroWeight: ['', Validators.required],
      heroName: ['', Validators.required],
      heroHeight: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  async getDataSuperPower() {
    this.toppingList = [];
    await this.superPowerService
      .getSuperPowerTable()
      .toPromise()
      .then((response) => {
        if (response) {
          this.superPowerList = response.dataList;
          response.dataList.forEach((element) => {
            this.toppingList.push(element.superPower);
          });
        }
      });
  }

  private async _getSuperPowerById() {
    let id = this.route.snapshot.params['id'];
    try {
      await this.heroesService
        .getHeroById(id)
        .toPromise()
        .then((response) => {
          let power: any = [];
          response?.heroesSuperPower.forEach((element) => {
            power.push(element.superPower);
          });
          this.toppings.setValue(power);

          if (response) {
            response.birthDate = moment(response.birthDate).format(
              'YYYY-MM-DD'
            );

            this.form.patchValue(response);
            this.dataSelecionada = response.birthDate;
          }
        });
    } catch (error) {}
  }

  verifyAction(): void {
    let id = this.route.snapshot.params['id'];
    if (id == 0) {
      this.actionName = 'Inserir Herói';
    } else {
      this.actionName = 'Editar Herói';
    }
  }

  buildSuperPowers() {
    return this.superPowerList.filter((item) =>
      this.toppings.value.includes(item.superPower)
    );
  }

  showSuperPowers() {}

  async save() {
    let superPowersList = this.buildSuperPowers();
    const form = this.form.getRawValue();
    let t = { ...form } as Heroes;
    t.heroesSuperPower = superPowersList;
    t.birthDate = moment(t.birthDate).format();
    let id = this.route.snapshot.params['id'];
    if (id != 0) {
      this.loadingService.show('Editando heroi');
      try {
        await this.heroesService.updateHero(t).toPromise();
        this.notification.Success('Heroi Editado', 'Sucesso');
      } catch (error: any) {
        if (error.status == 400) {
          this.notification.Error(error.error.ResponseText, 'Erro');
        } else {
          this.notification.Error('Aconteceu algum erro inesperado', 'Erro');
        }
      } finally {
        this.loadingService.hide();
      }
    } else if (id == 0) {
      try {
        this.loadingService.show('Salvando novo heroi');
        await this.heroesService.saveHero(t).toPromise();
        this.notification.Success('Heroi Salvo', 'Sucesso');
      } catch (error: any) {
        if (error.status == 400) {
          this.notification.Error(error.error.ResponseText, 'Erro');
        } else {
          this.notification.Error('Aconteceu algum erro inesperado', 'Erro');
        }
      } finally {
        this.loadingService.hide();
      }
    }
  }

  back() {
    this.router.navigate(['/heroes']);
  }
}
