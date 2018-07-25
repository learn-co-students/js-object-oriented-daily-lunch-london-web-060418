// Meal has many deliveries
// Meals has many customers through deliveries
// Customer has many deliveries
// Customer has many meals throuhg deliveries
// Delivery BelongsTo meal, BelongsTo customer  //has: customerId, mealId   constructor(meal, customer)
// Customer BelongsTo neighborhood  //has:   neighborhoodId   constructor(neighborhood)
//
// Neighborhood has many deliveries
// Neighborhood has many customers       through deliveries?  but they live there?!
// Neighborhood has many meals through deliveries

// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let customerId = 0
class Customer {
  constructor(name, neighborhood){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhood.id
    store.customers.push(this)
  }
  //all delieveries for this customer instance:
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  //all meals from the deliveries to this customer:
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
    //return this.deliveries().map(delivery => delivery.meal());
  }
  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

let mealId = 0
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId = this.id
    })
  }

  customers(){   //only unique customers
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
    // return this.deliveries().map(delivery => {
    //   return delivery.customer()
    //   //var uniqueItems = [...new Set(items)]   //items is an array w duplicates
    // })
  }

  static byPrice() {    // Meal.byPrice()   Class Method
    return store.meals.sort((a, b) => a.price < b.price);    // Descending order:  biggest to smallest
  }
  // A class method that orders all meal instances by their price in descending order.
  //Use the static keyword to write a class method.
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer, neighborhood){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    this.neighborhoodId = neighborhood.id
    store.deliveries.push(this)
  }

  //FIND FIND FIND
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id = this.customerId
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id = this.neighborhoodId
    })
  }
}

let neighborhoodId = 0
class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries(){   //to this neighborhood
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId = this.id
    })
  }

  customers(){   // FILTER HERE !!!!   customers in this neighbourhood
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {  // returns a unique list of meals that have been ordered in a particular neighborhood
    // const allMeals = this.customers().map(customer => customer.meals());
    // const merged = [].concat.apply([], allMeals);
    // return [...new Set(merged)];
  }
}


let chineseDuck = new Meal("Chinese Crispy Duck", 30)
let chineseSpringRolls = new Meal("Chinese Spring Rolls", 15)
let hackney = new Neighborhood("Hackney")
let bobby = new Customer("Bobby Lou", hackney)
let shz = new Customer("Shen Zen", hackney)

let chinese = new Delivery(chineseDuck, bobby, hackney)
let chinese5 = new Delivery(chineseDuck, shz, hackney)
let chinese6 = new Delivery(chineseDuck, shz, hackney)
let chinese7 = new Delivery(chineseDuck, shz, hackney)
let chinese2 = new Delivery(chineseSpringRolls, bobby, hackney)

console.log(store.deliveries); //0: Delivery {id: 1, mealId: 1, customerId: 1, neighborhoodId: 1}
console.log(chinese.meal());  //Meal {id: 1, title: "Chinese Crispy Duck", price: 30}
console.log(chinese.meal().price);  // 30

console.log(bobby.meals())  //  [Meal, Meal]
console.log(bobby.meals()[0].price)   //30

console.log(bobby.totalSpent())   // 45

console.log(chineseDuck.customers())   // only finds the first one ???  PROBLEM !!!!!!!!
// Customer {id: 1, name: "Bobby Lou", neighborhoodId: 1}

console.log(Meal.byPrice());

console.log(hackney.customers());  // FILTER !!!!   [Customer, Customer]
// Customer {id: 1, name: "Bobby Lou", neighborhoodId: 1}
// Customer {id: 2, name: "Shen Zen", neighborhoodId: 1}

//console.log(hackney.meals());
