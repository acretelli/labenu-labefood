const makeRestaurants = (n) => {
    // returns n number of restaurant items
    // default is 15
    const num = n || 15;
    const restaurants = [];
    for (let i = 0; i < num; i++) {
        restaurants.push({
        id: `${i}`,
        description: `Description for restaurante item ${i}`,
        shipping: i,
        address: `Street for item ${i}`,
        name: `Restaurante item ${i}`,
        logoUrl: `logo-${i}`,
        delieveryTime: i * 10,
        category: `Category ${i}`,
      });
    }
    return restaurants;
  };
  