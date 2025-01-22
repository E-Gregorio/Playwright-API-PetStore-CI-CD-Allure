import { test, expect } from '@playwright/test';
import { createPet } from '../../utils/pet-api';
import petData from '../../fixtures/pet-data.json';

test('TC3: Validar creación de nueva mascota con datos válidos', async () => {
    // Datos iniciales del JSON
    const newPet = petData.newPet;

    // Enviar solicitud POST
    const response = await createPet(newPet);

    // Validar código de estado
    expect(response.status).toBe(200);

    // Validar contenido del cuerpo de la respuesta
    const responseBody = await response.json();

    console.log('Cuerpo de la respuesta:', JSON.stringify(responseBody, null, 2));

    // Validar campos clave
    expect(responseBody.name).toBe(newPet.name);
    expect(responseBody.category.name).toBe(newPet.category.name);
    expect(responseBody.status).toBe(newPet.status);
    expect(Array.isArray(responseBody.photoUrls)).toBe(true);
    expect(responseBody.photoUrls[0]).toBe(newPet.photoUrls[0]);
});
