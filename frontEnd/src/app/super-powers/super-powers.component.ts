import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SuperPowerService } from './super-powers.service';
import { SuperPower, Response } from './super-powers.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../services/loading/loading.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-super-powers',
  templateUrl: './super-powers.component.html',
  styleUrls: ['./super-powers.component.scss'],
})
export class SuperPowersComponent {
  displayedColumns: string[] = ['superPower', 'description', 'acao'];
  dataSource = new MatTableDataSource<any>();
  currentSuperPower!: SuperPower;
  @ViewChild('contentDelete') private deleteModal!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  superPowerData: Response = {
    dataList: [],
    summary: {
      listSize: 0,
      page: 0,
      returnedListSize: 0,
      totalPages: 0,
    },
  };
  tableSummary: number = 0;
  constructor(
    private superPowerService: SuperPowerService,
    private router: Router,
    private modalService: NgbModal,
    private loadingService: LoadingService,
    private notification: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
   await this.getDataSuperPower();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async getDataSuperPower() {
    try {
      this.loadingService.show("Carregando dados");
      await this.superPowerService
        .getSuperPowerTable()
        .toPromise()
        .then((response) => {
          if (response) {
            this.dataSource = new MatTableDataSource(response.dataList);
            this.dataSource.paginator = this.paginator;
          }
        });
    } catch (error) {
      this.notification.Error(error, 'Erro');
    } finally {
      this.loadingService.hide();
    }
  }

  inserSuperPower() {
    this.router.navigate(['/super-power/', 0]);
  }

  editSuperPower(objeto: any) {
    this.router.navigate(['/super-power/', objeto.id]);
  }

  remove(objeto: any) {
    this.currentSuperPower = objeto;
    this.modalService.open(this.deleteModal, {
      ariaLabelledBy: 'modal-basic-title',
    }).result;
  }

  async handleDelete(superPower: SuperPower) {
    this.loadingService.show("Excluindo super poder");
    this.modalService.dismissAll();
    try {
      await this.superPowerService
        .removeSuperPower(superPower.id)
        .toPromise();
        this.notification.Success("Removido com sucesso","Sucesso")

      await this.getDataSuperPower();
    } catch (error) {
      this.notification.Error(error, 'Erro');
    } finally {
      this.loadingService.hide();
    }
  }
}
