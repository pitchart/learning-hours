import { Country, Currency, Language } from "../../../../../src/com/murex/tbw/domain/country";

export class CountryBuilder {
    private name: string = "France";
    private currency: Currency = Currency.Dollar;
    private language: Language = Language.English;

    private constructor() { }

    static ACountry() {
        return new CountryBuilder();
    }

    named(name: string) {
        this.name = name;
        return this;
    }

    withCurrency(currency: Currency) {
        this.currency = currency;
        return this;
    }

    withLanguage(language: Language) {
        this.language = language;
        return this;
    }

    build() {
        return new Country(this.name, this.currency, this.language);
    }
}

export const aCountry = () => CountryBuilder.ACountry();

export const usa = aCountry()
    .named("USA")
    .withCurrency(Currency.Dollar)
    .withLanguage(Language.English)
    .build();
