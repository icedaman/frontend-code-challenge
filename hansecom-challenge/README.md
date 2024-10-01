# How to run this vue app:

After following the instructions to get the backend server up and running, simply run:

1: cd hansecom-challenge
2: npm install
3: npm run dev

That's it, you should be good to go!


# OBS:

Even though the Users API works well, the Orders API is not working properly due to userId (user_id in db) always returning null from the API response.

When I create an order with a POST request, an order is created in the db with orderDate and product(and other date fields), but the API does not allow the userId to be stored, even if it's hard coded.

It replaces the userId value sent in the form by null.

So to fix this issue I'm storing the orders on the Orders Store and in Local Storage to simulate the API's behaviour.
