document.addEventListener('DOMContentLoaded', () => {
  const pizzas = [
    { 
      id: 1, 
      nombre: 'pizza de Muzzarella', 
      precio: 8.99, 
      ingredientes: ['Muzzarella', 'Tomate', 'Aceitunas'], 
      imagen: 'img/muzzarella.png' 
    },
    { 
      id: 2, 
      nombre: 'pizza de Cebolla', 
      precio: 9.99, 
      ingredientes: ['Muzzarella', 'Tomate', 'Cebolla'], 
      imagen: 'img/cebolla.png' 
    },
    { 
      id: 3, 
      nombre: 'pizza 4 Quesos', 
      precio: 10.99, 
      ingredientes: ['Muzzarella', 'Tomate', 'Queso Azul', 'Parmesano', 'Roquefort'], 
      imagen: 'img/4quesos.png' 
    },
    { 
      id: 4, 
      nombre: 'pizza Especial', 
      precio: 10.99, 
      ingredientes: ['Muzzarella', 'Tomate', 'Rucula', 'Jamón'], 
      imagen: 'img/especial.png' 
    },
    { 
      id: 5, 
      nombre: 'pizza con Anana', 
      precio: 10.99, 
      ingredientes: ['Muzzarella', 'Tomate', 'Anana'], 
      imagen: 'img/anana.png' 
    },
  ];

  const form = document.getElementById('pizza-form');
  const resultContainer = document.getElementById('result-container');

  // Funcion para renderizar una pizza
  const renderPizza = (pizza) => {
      const ingredientesList = pizza.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('');
      const card = `
          <div class="card">
              <img src="${pizza.imagen}" alt="${pizza.nombre}">
              <h2>${pizza.nombre}</h2>
              <p>Precio: $${pizza.precio.toFixed(2)}</p>
              <ul>Ingredientes: ${ingredientesList}</ul>
          </div>
      `;
      resultContainer.innerHTML = card;
  };

  // Mostrar la pizza si existe en el local Storage
  const showSavedPizza = () => {
      const savedPizzaId = localStorage.getItem('lastPizzaId');
      if (savedPizzaId) {
          const pizza = pizzas.find(pizza => pizza.id === parseInt(savedPizzaId, 10));
          if (pizza) {
              renderPizza(pizza);
          }
      }
  };

  showSavedPizza();

  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const pizzaId = parseInt(document.getElementById('pizza-id').value, 10);

      resultContainer.innerHTML = ''; 

      if (isNaN(pizzaId)) {
          resultContainer.innerHTML = '<p class="error">Por favor, ingrese un número válido.</p>';
          return;
      }

      const pizza = pizzas.find(pizza => pizza.id === pizzaId);

      if (pizza) {
          // Guardar pizza en localStorage
          localStorage.setItem('lastPizzaId', pizza.id);
          renderPizza(pizza);
      } else {
          resultContainer.innerHTML = '<p class="error">No se encontró una pizza con ese ID.</p>';
          // No guardar si no se encuentra la pizza en el localstorage
          localStorage.removeItem('lastPizzaId');
      }
  });
});


