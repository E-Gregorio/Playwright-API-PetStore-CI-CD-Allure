import { test, expect } from '@playwright/test';

test('TC16: Validar creación de pedido exitoso con producto del inventario', async ({ request }) => {
  // Datos del pedido
  const orderData = {
    id: 0,
    petId: 0,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: "placed",
    complete: true
  };

  // Hacer la solicitud POST
  const response = await request.post('https://petstore.swagger.io/v2/store/order', {
    data: orderData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  //
  expect(response.status()).toBe(200);

  
  const responseBody = await response.json();
  
  
  expect(responseBody).toHaveProperty('id');  // Verifica que 'id' esté presente
  

  expect(responseBody.id).toBeGreaterThan(0);  
  expect(responseBody.petId).toBe(orderData.petId);
  expect(responseBody.quantity).toBe(orderData.quantity);
  expect(responseBody.status).toBe(orderData.status);
  expect(responseBody.complete).toBe(orderData.complete);
});
