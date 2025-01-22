import { test, expect } from '@playwright/test';
import petData from '../../fixtures/pet-data.json';  // Asegúrate de que la ruta sea correcta

test('TC9: Validar que no existe mascota con ID inválido', async ({ request }) => {
    const invalidId = petData.testIds.invalidId;  // ID inválido

    
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${invalidId}`);

    
    expect(response.status()).toBe(404);
    console.log(`Estado de la respuesta: ${response.status()}`);

    // Verificar objeto con los campos correctos
    const responseBody = await response.json();
    console.log("Respuesta JSON:", JSON.stringify(responseBody, null, 2));
    expect(responseBody).toEqual({
        code: 1,
        message: 'Pet not found',
        type: 'error'
    });
});
