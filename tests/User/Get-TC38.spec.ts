import { test, expect } from '@playwright/test';

test('TC38: Validar login exitoso con credenciales válidas', async ({ request, page }) => {
  // Datos de entrada para login exitoso
  const validUsername = 'claud';
  const validPassword = '2020';

  // Definir el cuerpo simulado de la respuesta de la API 
  const mockedResponse = {
    code: 200,
    type: 'unknown',
    message: 'logged in user session:1737566753312', // Este valor es solo un ejemplo
  };

  // Simular la respuesta de la API para el login
  await page.route('**/user/login', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedResponse),
    });
  });

  
  const response = await request.get(`https://petstore.swagger.io/v2/user/login?username=${validUsername}&password=${validPassword}`);

  
  expect(response.status()).toBe(200);

  
  const responseBody = await response.json();
  expect(responseBody.code).toBe(200);
  expect(responseBody.message).toContain('logged in user session:'); // Verificar que el mensaje contenga la sesión

  
  console.log('Response Body:', responseBody);
});
