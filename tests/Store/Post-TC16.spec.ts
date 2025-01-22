import { test, expect } from '@playwright/test';

test('TC16: Validar creación de pedido exitoso con producto del inventario (mocking de respuesta)', async ({ page }) => {
  // Simulamos la respuesta para la creación del pedido
  const mockOrderResponse = {
    id: 9223372036854755000,  // ID simulado del pedido
    petId: 0,                  // ID de la mascota (se puede modificar si es necesario)
    quantity: 1,               // Cantidad simulada
    shipDate: "2025-01-22T16:13:59.366+0000",  // Fecha de envío simulada
    status: "placed",          // Estado del pedido simulado
    complete: true             // Marca que el pedido está completo
  };

  // Interceptamos la solicitud POST al endpoint '/store/order'
  await page.route('**/store/order', route => {
    console.log('Interceptando solicitud a /store/order'); // Para verificar que la ruta es interceptada
    route.fulfill({
      status: 200,                        // Simulamos un status 200
      contentType: 'application/json',    // Tipo de contenido
      body: JSON.stringify(mockOrderResponse),  // Respuesta JSON mockeada
    });
  });

  // Datos de la solicitud para crear el pedido
  const storeOrderData = {
    id: 0,                // ID simulado (será reemplazado por la respuesta mockeada)
    petId: 0,             // ID de la mascota
    quantity: 1,          // Cantidad
    shipDate: new Date().toISOString(),
    status: "placed",     // Estado del pedido
    complete: true        // Estado de completitud
  };

  // Hacer la solicitud para crear el pedido
  const response = await page.request.post('https://petstore.swagger.io/v2/store/order', {
    data: storeOrderData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Verificamos que el status de la respuesta sea 200
  console.log(`Response Status: ${response.status()}`);
  expect(response.status()).toBe(200);

  // Imprimimos el cuerpo de la respuesta para ver los detalles
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  // Verificamos que el ID esté presente y sea igual al ID mockeado
  expect(responseBody).toHaveProperty('id');
  expect(responseBody.id).toBe(9223372036854755000);  // ID simulado
});
