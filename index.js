let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals(){
    let meals = []
    let mealIds = this.deliveries().map(delivery => delivery.mealId)
    store.meals.forEach((meal) => {
      if(mealIds.includes(meal.id)){
        meals.push(meal)
      }
    })
    return meals;
  }
}

let customerId = 0
class Customer {
  constructor(name, neighborhoodId){
    this.neighborhoodId = neighborhoodId
    this.name = name
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals(){
    let meals = []
    let mealIds = this.deliveries().map(delivery => delivery.mealId)
    mealIds.forEach((mealId) => {
      store.meals.forEach((meal) => {
        if(meal.id === mealId){
          meals.push(meal)
        }
      })
    })
    return meals;
  }

  totalSpent(){
    let total = 0
    this.meals().forEach((meal) => {
      total += meal.price
    })
    return total
  }
}

let deliveryId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find((meal) => meal.id === this.mealId);
  }

  customer(){
    return store.customers.find((customer) => customer.id === this.customerId);
  }

  neighborhood(){
    return store.neighborhoods.find((neighborhood) => neighborhood.id === this.neighborhoodId);
  }
}

let mealId = 0
class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort((a, b) => {
      return b.price - a.price
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    let customers = []
    let customerIds = this.deliveries().map((delivery) => delivery.customerId)
    customerIds.forEach((customerId) => {
      store.customers.forEach((customer) => {
        if(customer.id === customerId){
          customers.push(customer)
        }
      })
    })
    return customers;
  }
}
