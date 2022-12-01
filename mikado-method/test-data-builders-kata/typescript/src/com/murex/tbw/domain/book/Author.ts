import { Country } from "../country/Country";

export class Author {
  readonly name: string;
  readonly nationality: Country;
  private age: number;

  public constructor(name: string, nationality: Country, age: number) {
    this.name = name;
    this.nationality = nationality;
    this.age = age;
  }
}
