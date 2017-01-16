'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);



//ForEach loop
cars.forEach(function (item) {
    console.log(item.id)
});

//Handling dates in JS
var date1 = new Date('2017-01-05');
var date2 = new Date('2017-01-07');
//date.getTime();

function RentalDays(A, B) // function to get the number of day of the rental 
{
    var a = new Date(A);
    var b = new Date(B);
    var Result = b.getTime() - a.getTime();
    Result = Result / 86400000;
    return Result + 1; // +1 : calendar days
}


function RentalPrice(rental) {   // function to get the Price of a rental 
    var Price;
    var time = RentalDays(rental.pickupDate, rental.returnDate); // time of rental 
    for (var i = 0; i < cars.length; i++) { // we run the list of cars ..
        if (rental.carId == cars[i].id) {  // .. in order to have the car that we rent 
            var RentaltimePrice = time * cars[i].pricePerDay;   // compute the time component
            // reduction by time : 
            if (time > 1 && time <= 4) {
                RentaltimePrice = RentaltimePrice * 0.9;
            }

            if (time > 4 && time <= 10) {
                RentaltimePrice = RentaltimePrice * 0.7;
            }
            if (time > 10) {
                RentaltimePrice = RentaltimePrice * 0.5;
            }
            var RentalDistanceTime = rental.distance * cars[i].pricePerKm; // compute the distance  component
            //console.log(RentalDistanceTime);
           // console.log(RentaltimePrice);
            Price = RentalDistanceTime + RentaltimePrice; // compute the final price 
            
        }
    }
    rental.price = Price + DeductibleOpt(rental); // we change the price in the object Rentals
    return Price;
}



// loop to get the price for each object in Rentals 
for (var i = 0; i < rentals.length; i++)
{
    RentalPrice(rentals[i]);
   
}

function GetCommission(rental) { // function to get the commission of a rental 
    var com = (RentalPrice(rental) - DeductibleOpt(rental)) * 0.3; // total commision without the Deductible Option 
    var time = RentalDays(rental.pickupDate, rental.returnDate); // time of rental 
    var ins = com * 0.5; // insurrance 
    rental.commission.insurance = ins;
    rental.commission.assistance = time; // assistance 
    var driv = com - (rental.commission.insurance + rental.commission.assistance) + DeductibleOpt(rental); // drivy (+ deductible option if true)
    rental.commission.drivy = driv;
    return rental.commission;
}

function DeductibleOpt (rental) // get the price of deductible option for a rental
{
    var time = RentalDays(rental.pickupDate, rental.returnDate); // time of rental 
    var opt;
    if (rental.options.deductibleReduction == true) // if we have the deductible option 
    {
        opt = 4 * time;
    }
    else
    {
        opt = 0;
    }
  
    return opt; 

}

// loop to get the commission for each object in Rentals
for (var i = 0; i < rentals.length; i++) {
    GetCommission(rentals[i]);
}

function PayActors(rental)
{

    var Pdrivrer = RentalPrice(rental); // Price that driver will pay 
    var com = (RentalPrice(rental) - DeductibleOpt(rental)) * 0.3; // price of the commission (without the Deductible Opt)
    var Powner = Pdrivrer - com ; // Owner will receive the rental price minus the com
    var Pinsurance = com * 0.5;
    var Passist = RentalDays(rental.pickupDate, rental.returnDate); 
    var Pdrivy = com - (rental.commission.insurance + rental.commission.assistance) + DeductibleOpt(rental); // drivy (+ deductible option if true)


    for (var i = 0; i < actors.length; i++) // run the list of actors
    {
        if (rental.id == actors[i].rentalId) // we check rental/actors
        {
            for (var j = 0; j < actors[i].payment.length; j++)  // we run the different actors 
            {
                if (actors[i].payment[j].who == "driver")
                {
                    actors[i].payment[j].amount = Pdrivrer;
                }
                if (actors[i].payment[j].who == "owner")
                {
                    actors[i].payment[j].amount = Powner;
                }
                if (actors[i].payment[j].who == "insurance") {
                    actors[i].payment[j].amount = Pinsurance;
                }
                if (actors[i].payment[j].who == "assistance ") {
                    actors[i].payment[j].amount = Passist;
                }
                if (actors[i].payment[j].who == "drivy") {
                    actors[i].payment[j].amount = Pdrivy;
                }
            }
        }
    }

}

// loop to get the amount for each object in actors
for (var i = 0; i < actors.length; i++) {
    PayActors(rentals[i]);

}

console.log(rentals);
console.log(actors);


console.log(RentalDays(date1, date2));


