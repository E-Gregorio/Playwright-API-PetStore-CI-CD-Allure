import { test, expect } from '@playwright/test';
import petData from '../../fixtures/pet-data.json';  // Asegúrate de que la ruta sea correcta

test('TC9: Validar que no existe mascota con ID inválido', async ({ request }) => {
    const invalidId = petData.testIds.invalidId;  // ID inválido

    // Realizar la solicitud GET con el ID inválido
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${invalidId}`);

    // Validar que el código de estado sea 404
    expect(response.status()).toBe(404);
    console.log(`Estado de la respuesta: ${response.status()}`);

    // Verificar que el cuerpo de la respuesta es un objeto con los campos correctos
    const responseBody = await response.json();
    console.log("Respuesta JSON:", JSON.stringify(responseBody, null, 2));
    expect(responseBody).toEqual({
        code: 1,
        message: 'Pet not found',
        type: 'error'
    });
});
