import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Heroes, Response } from '../heroes/heroes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroesService } from './heroes.service';
import * as moment from 'moment';
import { LoadingService } from '../services/loading/loading.service';
import { NotificationService } from '../services/notification/notification.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  displayedColumns: string[] = [
    'name',
    'heroName',
    'birthDate',
    'heroHeight',
    'heroWeight',
    'acao',
  ];
  displayedPowersColumns: string[] = ['superPower', 'description'];
  dataSource = new MatTableDataSource<any>();
  currentHero!: Heroes;
  tableHeroEmpty: boolean = true;
  dataSourceSuperPowers: any = new MatTableDataSource<any>();
  @ViewChild('contentDelete') private deleteModal!: TemplateRef<any>;
  @ViewChild('contentView') private viewModal!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  heroData: Response = {
    dataList: [],
  };
  tableSummary: number = 0;
  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private modalService: NgbModal,
    private loadingService: LoadingService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getDataHero();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showSuperPowers(objeto: any) {
    this.dataSourceSuperPowers = objeto.heroesSuperPower;
    this.modalService.open(this.viewModal, {
      ariaLabelledBy: 'modal-basic-title',
    }).result;
  }

  async getDataHero() {
    this.loadingService.show('Procurando heróis');
    try {
      await this.heroesService
        .getHeroesTable()
        .toPromise()
        .then((response) => {
          if (response) {
            response.dataList.forEach((element) => {
              element.birthDate = moment(element.birthDate).format(
                'DD-MM-YYYY'
              );
            });
            this.dataSource = new MatTableDataSource(response.dataList);
            if(response.dataList.length != 0) this.tableHeroEmpty = false
            this.dataSource.paginator = this.paginator;
          }
        });
    } catch (error) {
      this.notification.Error(error, 'Erro');
    } finally {
      this.loadingService.hide();
    }
  }

  insertNew() {
    this.router.navigate(['/heroes/', 0]);
  }

  editHero(objeto: any) {
    this.router.navigate(['/heroes/', objeto.id]);
  }

  remove(objeto: any) {
    this.currentHero = objeto;
    this.modalService.open(this.deleteModal, {
      ariaLabelledBy: 'modal-basic-title',
    }).result;
  }

  async handleDelete(heroes: Heroes) {
    this.modalService.dismissAll();
    this.loadingService.show('Removendo herói');
    try {
      await this.heroesService
        .removeHero(heroes.id)
        .toPromise();
      await this.getDataHero();
      this.notification.Success('Removido com sucesso', 'Sucesso');
    } catch (error) {
      this.notification.Error(error, 'Erro');
    } finally {
      this.loadingService.hide();
    }
  }
}
