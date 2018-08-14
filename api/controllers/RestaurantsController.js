/**
 * RestaurantsController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fetch = require('node-fetch');
const _ = require('lodash');

const getData = async () => {
  try {
    let r = await fetch('http://localhost:1337/restaurants');
    let json = await r.json();

    return json;
  } catch (e) {
    console.log(e)
  }
};
module.exports = {
  main: function (req, res) {
    getData().then(data => {
      // return res.json(data);
      return res.view('homepage', { data });
    });
  },

  list: function (req, res) {
    getData().then(data => {
      return res.json(data);
    })
  },

  get: function (req, res) {
    const restaurantID = req.params[0];

    getData().then(data => {
      const restaurant = _.find(data, o => {
        return o.id == restaurantID;
      });

      // return res.view('restaurant');
      return res.json(restaurant);
    });
  }
};

