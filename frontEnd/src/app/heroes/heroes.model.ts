class Response {
  dataList: Heroes[];

  constructor(response: Response) {
    this.dataList = response.dataList;
  }
}

class Heroes {
  id: number;
  name: string;
  heroName: string;
  birthDate: string;
  heroHeight: string;
  heroWeight: string;
  heroesSuperPower: any[];
  constructor(heroes: Heroes) {
    this.id = heroes.id;
    this.name = heroes.name;
    this.heroName = heroes.heroName;
    this.birthDate = heroes.birthDate;
    this.heroHeight = heroes.heroHeight;
    this.heroWeight = heroes.heroWeight;
    this.heroesSuperPower = heroes.heroesSuperPower;
  }
}

export { Heroes, Response };
