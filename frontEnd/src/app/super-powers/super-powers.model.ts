class FilterParams {
    pageNumber?: number;
    listSize?: number;
    constructor(filterParams: FilterParams) {
       this.pageNumber = filterParams.pageNumber ? filterParams.pageNumber : 0;
       this.listSize = filterParams.listSize ? filterParams.listSize : 0;
    }
 }

 class Response {
    dataList: SuperPower[];
    summary: {
       listSize: number;
       page: number;
       returnedListSize: number;
       totalPages: number;
    }
    constructor(response: Response) {
       this.summary = response.summary;
       this.dataList = response.dataList;
    }
 }

 class SuperPower {
    id: number;
    description: string;
    superPower: string;
    constructor(superPower: SuperPower) {
       this.id = superPower.id;
       this.superPower = superPower.superPower;
       this.description = superPower.description;
    }
 }

 
 export{FilterParams, SuperPower, Response}