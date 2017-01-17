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

function convertDate(str)
{
  var re=/[0-9]+/g;
  var result = re[Symbol.match](str);
  var dateLoc=new Date(result[0],result[1],result[2]);
  return dateLoc;
}

//---------------Question 1--------------//

function getFinalPrice()
{
  for(var i = 0; i<rentals.length; i++)
  {
    timeDiff = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    diffDays = (((timeDiff /1000)/3600)/24) + 1;

    for(var j=0; j<cars.length;j++)
    {
      if(rentals[i].carId == cars[j].id )
      {
        rentals[i].price = cars[j].pricePerDay*diffDays + cars[j].pricePerKm*rentals[i].distance;
      }
    }
    console.log(rentals[i].price); 
  }
}

//---------------Question 2--------------//

function getFinalPrice2()
{
  var timeDiff;
  var diffDays;
  var distance=[];
  var price;
  
  for(var i = 0; i < rentals.length; i++) 
  {
    //recupere les distances
    distance[i]=rentals[i].distance;
    
    //calcul nbr de jours
    timeDiff = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    diffDays = (((timeDiff /1000)/3600)/24) + 1;
    
    //calcul du prix
    rentals[i].price = diffDays * cars[i].pricePerDay + rentals[i].distance * cars[i].pricePerKm;
    
    if(diffDays > 1 && diffDays <= 4)
    {
      price = rentals[i].price - (rentals[i].price * 0.10);
      rentals[i].price = price;
    }
    
    else if(diffDays > 4 && diffDays <= 10)
    {
      price = rentals[i].price - (rentals[i].price * 0.30);
      rentals[i].price = price;
    }
    
    else if(diffDays > 10)
    {
      price = rentals[i].price - (rentals[i].price * 0.50);
      rentals[i].price = price;
    }
    
    console.log(rentals[i].price);
  }
}

//---------------Question 3--------------//

function getCommission()
{
  var price;
  var commission;
  var insurance;
  var roadsideAssisst;
  var drivy;
  
  var timeDiff;
  var diffDays;
  
  
  for(var i = 0; i < rentals.length; i++) 
  {

    timeDiff = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    diffDays = (((timeDiff /1000)/3600)/24) + 1;

    price = rentals[i].price;
    commission = price * 0.30;
    insurance = commission / 2;
    
    roadsideAssisst = diffDays;
    
    drivy = commission - (insurance + roadsideAssisst);
    
    rentals[i].commission.insurance = insurance;
    rentals[i].commission.assistance = roadsideAssisst;
    rentals[i].commission.drivy = drivy;
    
    console.log(rentals[i].commission);
  }
}

