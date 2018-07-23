// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

function uniqueTest(value, index, array) {
  return array.indexOf(value) === index
}

class Neighborhood {

  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter( del => del.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter( cust => cust.neighborhoodId === this.id)
  }

  meals() {
    const hoodCustomers = [...this.customers()]
    let hoodMeals = []

    for (let cust of hoodCustomers) {
      hoodMeals = [...hoodMeals, ...cust.meals()]
    }

    return hoodMeals.filter( uniqueTest )
  }
}

class Customer {

  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( del => del.customerId === this.id )
  }

  meals() {
    const mealIds = this.deliveries().map( del => del.mealId )
    // return store.meals.filter( meal => mealIds.includes(meal.id) )
    return mealIds.map( mealId => store.meals.find( meal => meal.id === mealId ) )
  }

  totalSpent() {
    return this.meals().reduce( (sum, meal) => sum + meal.price, 0 )
  }
}

class Meal {

  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter( del => del.mealId === this.id )
  }

  customers() {
    const customerIds = this.deliveries().map( del => del.customerId )
    return store.customers.filter( cust => customerIds.includes(cust.id) )
  }

  static byPrice() {
    let meals = [...store.meals]
    return meals.sort( (m1, m2) => m2.price - m1.price )
  }
}

class Delivery {

  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find( meal => meal.id === this.mealId )
  }

  customer() {
    return store.customers.find( cust => cust.id === this.customerId )
  }

  neighborhood() {
    return store.neighborhoods.find( neigh => neigh.id === this.neighborhoodId )
  }
}
