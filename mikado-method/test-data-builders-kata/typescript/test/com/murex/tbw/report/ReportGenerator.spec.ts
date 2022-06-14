import { ReportGenerator } from "../../../../../src/com/murex/tbw/report/ReportGenerator";
import { MainRepository } from "../../../../../src/com/murex/tbw/MainRepository";
import { InMemoryRepository } from "../storage/InMemoryRepository";
import { Author, EducationalBook, Category } from "../../../../../src/com/murex/tbw/domain/book";
import { Country, Currency, Language } from "../../../../../src/com/murex/tbw/domain/country";
import { Invoice, PurchasedBook } from "../../../../../src/com/murex/tbw/purchase";

class CountryBuilder{
    
    private name: string = "France";
    private currency: Currency = Currency.Dollar;
    private language: Language = Language.English;
    
    private constructor() {}

    static ACountry() {
        return new CountryBuilder();
    }
    
    WithName(name: string) {
        this.name = name;
        return this;
    }
    
    WithCurrency(currency: Currency) {
        this.currency = currency;
        return this;
    }
    
    WithLanguage(language: Language) {
        this.language = language;
        return this;
    }
    
    Build() {
        return new Country(this.name, this.currency, this.language);
    }
}

class AuthorBuilder{

    private name: string = "Jack";
    private country: Country = CountryBuilder.ACountry().Build();
    
    private constructor() {};
    
    static AnAuthor(): AuthorBuilder{
        return new AuthorBuilder();
    };
    
    WithName(name: string): AuthorBuilder {
        this.name = name;
        return this;
    }
    
    WithCountry(country: Country): AuthorBuilder {
        this.country = country;
        return this;
    }

    Build(): Author {
        return new Author(this.name,this.country);
    }
}


describe(ReportGenerator, () => {
    it("Computes total amount without discount and without tax rate", () => {
      const repository = new InMemoryRepository();
      MainRepository.override(repository);
      const generator = new ReportGenerator();

      const usa = CountryBuilder.ACountry()
        .WithName("USA")
        .WithCurrency(Currency.Dollar)
        .WithLanguage(Language.English)
        .Build();
        
        const bob = AuthorBuilder.AnAuthor().WithName("Uncle Bob").WithCountry(usa).Build();

      const book = new EducationalBook(
          "Clean Code", 25, bob, Language.English, Category.COMPUTER);
        
      const purchase = new PurchasedBook(book, 2);

      const invoice = new Invoice("John Doe", usa);
      invoice.addPurchasedBook(purchase);

      repository.addInvoice(invoice);

      expect(generator.getTotalAmount()).toBe(57.5);
      expect(generator.getNumberOfIssuedInvoices()).toBe(1);
      expect(generator.getTotalSoldBooks()).toBe(2);

      MainRepository.reset();
    });
});
