import { AuthorBuilder } from "./AuthorBuilder";
import { CountryBuilder } from "./CountryBuilder";
import { EducationalBookBuilder } from "./EducationalBookBuilder";

export const anAuthor = (): AuthorBuilder => AuthorBuilder.anAuthor();

export const aCountry = (): CountryBuilder => CountryBuilder.aCountry();
export const usa = (): CountryBuilder => CountryBuilder.USA;

export const aBook = (): EducationalBookBuilder => EducationalBookBuilder.aBook();
