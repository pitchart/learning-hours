using BookInvoicing.Domain.Book;
using BookInvoicing.Domain.Country;
using System;
using System.Collections.Generic;
using System.Linq;
using static BookInvoicing.Tests.AuthorBuilder;
namespace BookInvoicing.Tests
{
    internal class NovelBuilder
    {
        private string _name = "A novel";
        private Author _author = AnAuthor().Build();
        private double _price = 0;
        private Language _language = Language.English;
        private Genre[] _genres = new List<Genre>().ToArray();

        internal static NovelBuilder ANovel()
        {
            return new NovelBuilder();
        }

        internal NovelBuilder Named(string name)
        {
            _name = name;
            return this;
        }

        internal NovelBuilder Costing(double price)
        {
            _price= price;
            return this;
        }

        internal NovelBuilder WrittenBy(Author author)
        {
            _author = author;
            return this;
        }

        internal NovelBuilder WrittenIn(Language language)
        {
            _language = language;
            return this;
        }

        internal NovelBuilder WithGenre(params Genre[] genres)
        {
            _genres = genres;
            return this;
        }

        internal Novel Build()
        {
            return new Novel(_name, _price, _author, _language, _genres.ToList());
        }
    }
}