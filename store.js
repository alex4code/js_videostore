"use strict";

function statement(customer, movies, format) {
    if (format === 'text') {
        return statamentText();
    } else if (format === 'html') {
        return statamentHtml();
    }

    function statamentText() {
        let result = `Rental Record for ${customer.name}\n`;
        for (let rental of customer.rentals) {
            result += `\t${moveFor(rental).title}\t${getAmount(rental)}\n`;
        }
        // add footer lines
        result += `Amount owed is ${getTotalAmount(customer)}\n`;
        result += `You earned ${getTotalFrequentRenterPoints(customer)} frequent renter points\n`;
        return result;
    }

    function statamentHtml() {
        let result = `<h1>Rental Record for <om>${customer.name}</om></h1>\n`;
        result += '<table>\n';
        for (let rental of customer.rentals) {
            result += `<tr><td>${moveFor(rental).title}</td><td>${getAmount(rental)}</td></tr>\n`;
        }
        result += '</tabel>\n';
        // add footer lines
        result += `<p>Amount owed is <em>${getTotalAmount(customer)}</em></p>\n`;
        result += `<p>You earned <em>${getTotalFrequentRenterPoints(customer)} </em> frequent renter points</p>\n`;
        return result;
    }


    function moveFor(rental) {
        return movies[rental.movieID]
    }

    function getAmount(rental) {
        let thisAmount = 0;
        let movie = moveFor(rental);

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

    function getFrequentRenterPoints(rental) {
        return (moveFor(rental).code === "new" && rental.days > 2) ? 2 : 1;
    }

    function getTotalAmount(customer) {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getAmount(rental);
        }
        return totalAmount;
    }

    function getTotalFrequentRenterPoints(customer) {
        let totalFrequentRenterPoints = 0;
        for (let rental of customer.rentals) {
            totalFrequentRenterPoints += getFrequentRenterPoints(rental);
        }
        return totalFrequentRenterPoints;
    }
}


let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

console.log(statement(customer, movies, 'text'));
console.log(statement(customer, movies, 'html'));