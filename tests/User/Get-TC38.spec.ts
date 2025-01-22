import { test, expect } from '@playwright/test';

test('TC38: Validar login exitoso con credenciales válidas', async ({ request, page }) => {
  // Datos de entrada para login exitoso
  const validUsername = 'claud';
  const validPassword = '2020';

  // Definir el cuerpo simulado de la respuesta de la API (con un valor dinámico para el mensaje)
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

  // Realizamos la solicitud GET para iniciar sesión
  const response = await request.get(`https://petstore.swagger.io/v2/user/login?username=${validUsername}&password=${validPassword}`);

  // Verificar que el código de estado sea 200
  expect(response.status()).toBe(200);

  // Verificar que el cuerpo de la respuesta sea el esperado (sin comparar el ID de la sesión)
  const responseBody = await response.json();
  expect(responseBody.code).toBe(200);
  expect(responseBody.message).toContain('logged in user session:'); // Verificar que el mensaje contenga la sesión

  // Validación adicional si es necesario
  console.log('Response Body:', responseBody);
});
