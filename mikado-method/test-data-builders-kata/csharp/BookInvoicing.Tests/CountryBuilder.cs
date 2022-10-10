using BookInvoicing.Domain.Country;

namespace BookInvoicing.Tests
{
    public class CountryBuilder
    {
        private string _name = "name";
        private Currency _currency = Currency.Euro;
        private Language _language = Language.French;

        public static CountryBuilder ACountry()
        {
            return new CountryBuilder();
        }

        public static CountryBuilder Usa()
        {
            return ACountry()
                .Named("USA")
                .WhoPaysIn(Currency.UsDollar)
                .Speaking(Language.French);
        }
        
        public CountryBuilder Named(string name)
        {
            _name = name;
            return this;
        }

        public CountryBuilder WhoPaysIn(Currency currency)
        {
            _currency = currency;
            return this;
        }

        public CountryBuilder Speaking(Language language)
        {
            _language = language;
            return this;
        }

        public Country Build()
        {
            return new Country(_name, _currency, _language);
        }

    }
}