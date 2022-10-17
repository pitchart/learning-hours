using BookInvoicing.Domain.Book;
using BookInvoicing.Domain.Country;
using System;

namespace BookInvoicing.Tests
{
    public class AuthorBuilder 
    {
        private string _name = "Bob";
        private Country _country = CountryBuilder.Usa().Build();
        private CountryBuilder _countryBuilder;

        public static AuthorBuilder AnAuthor()
        {
            return new AuthorBuilder();
        }

        public AuthorBuilder Named(string name)
        {
            _name = name;
            return this;
        }

        public AuthorBuilder BornIn(Country country)
        {
            _country = country;
            return this;
        }

        public Author Build()
        {
            return new Author(_name, _countryBuilder is null ? _country : _countryBuilder.Build());
        }

        internal AuthorBuilder BornIn(CountryBuilder country)
        {
            _countryBuilder = country;
            return this;
        }
    }
}