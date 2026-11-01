'use strict';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

const table = document.querySelector('table');
const modal = document.querySelector('dialog');
const message = document.querySelector('#message');

async function getRestaurants() {
  try {
    const response = await fetch(`${apiUrl}/restaurants`);
    if (!response.ok) throw new Error('Could not load restaurants.');
    const restaurants = await response.json();
    showRestaurants(restaurants);
  } catch (error) {
    message.innerText = `${error.message} Are you connected to the school network or VPN?`;
  }
}

function showRestaurants(restaurants) {
  for (const restaurant of restaurants) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${restaurant.name}</td>
      <td>${restaurant.address}</td>
    `;
    row.addEventListener('click', function () {
      openModal(restaurant);
    });
    table.append(row);
  }
}

async function openModal(restaurant) {
  modal.innerHTML = `
    <h2>${restaurant.name}</h2>
    <p>
      ${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}<br>
      Phone: ${restaurant.phone}<br>
      Company: ${restaurant.company}
    </p>
    <h3>Today's menu</h3>
    <div id="menu">Loading menu...</div>
    <form method="dialog">
      <button>Close</button>
    </form>
  `;
  modal.showModal();

  const menuDiv = document.querySelector('#menu');


  try {
    const response = await fetch(`${apiUrl}/restaurants/daily/${restaurant._id}/en`);
    if (!response.ok) throw new Error('Could not load the menu.');
    const menu = await response.json();

    if (menu.courses.length === 0) {
      menuDiv.innerText = 'No menu available for today.';
      return;
    }

    let html = '<ul>';
    for (const course of menu.courses) {
      html += `<li>${course.name} - ${course.price || 'no price'} (${course.diets || 'no diet info'})</li>`;
    }
    html += '</ul>';
    menuDiv.innerHTML = html;
  } catch (error) {
    menuDiv.innerText = error.message;
  }
}

getRestaurants();