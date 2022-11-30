import {ReportGenerator} from "../../../../../src/com/murex/tbw/report/ReportGenerator";
import {MainRepository} from "../../../../../src/com/murex/tbw/MainRepository";
import {InMemoryRepository} from "../storage/InMemoryRepository";
import {Invoice, PurchasedBook} from "../../../../../src/com/murex/tbw/purchase";
import { CountryBuilder } from "./CountryBuilder";
import { EducationalBookBuilder } from "./EducationalBookBuilder";

describe(ReportGenerator, () => {
    it("Computes total amount without discount and without tax rate", () => {
        const repository = new InMemoryRepository();
        MainRepository.override(repository);
        const generator = new ReportGenerator();

        const usa = CountryBuilder.USA.build();
        const book = EducationalBookBuilder.aBook().costing(25).build();

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
