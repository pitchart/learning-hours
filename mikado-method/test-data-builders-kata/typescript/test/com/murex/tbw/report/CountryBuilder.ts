import { Country, Currency, Language } from "../../../../../src/com/murex/tbw/domain/country";

export class CountryBuilder {
    private name: string = "country";
    private currency: Currency = Currency.Dollar;
    private language: Language = Language.English;

    static aCountry(): CountryBuilder {
        return new CountryBuilder();
    }
    named(name: string): CountryBuilder {
        this.name = name;
        return this;
    }
    payingIn(currency: Currency): CountryBuilder {
        this.currency = currency;
        return this;
    }

    speaking(language: Language): CountryBuilder {
        this.language = language;
        return this;
    }

    build(): Country {
        return new Country(this.name, this.currency, this.language);
    }

    static USA = this.aCountry().named("USA").payingIn(Currency.Dollar).speaking(Language.English);
}
