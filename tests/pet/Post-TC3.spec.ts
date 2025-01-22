import { test, expect } from '@playwright/test';
import { createPet } from '../../utils/pet-api';
import petData from '../../fixtures/pet-data.json';

test('TC3: Validar creación de nueva mascota con datos válidos', async () => {
    
    const newPet = petData.newPet;

    //solicitud POST
    const response = await createPet(newPet);

    
    expect(response.status).toBe(200);

    
    const responseBody = await response.json();

    console.log('Cuerpo de la respuesta:', JSON.stringify(responseBody, null, 2));

    
    expect(responseBody.name).toBe(newPet.name);
    expect(responseBody.category.name).toBe(newPet.category.name);
    expect(responseBody.status).toBe(newPet.status);
    expect(Array.isArray(responseBody.photoUrls)).toBe(true);
    expect(responseBody.photoUrls[0]).toBe(newPet.photoUrls[0]);
});
