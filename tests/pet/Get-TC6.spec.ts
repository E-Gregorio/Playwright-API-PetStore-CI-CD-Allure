import { test, expect } from '@playwright/test';

test('TC6: Validar búsqueda de mascotas disponibles por estado', async ({ page }) => {
    // Interceptamos la solicitud GET al endpoint y devolvemos una respuesta simulada
    await page.route('**/pet/findByStatus?status=available', async route => {
        const mockResponse = [
            { id: 1, name: 'doggie', status: 'available' },
            { id: 2, name: 'kitty', status: 'available' },
            { id: 3, name: 'bunny', status: 'available' }
        ];
        await route.fulfill({
            status: 200, // Código de estado HTTP exitoso
            contentType: 'application/json',
            body: JSON.stringify(mockResponse),
        });
    });

    // Realizamos la solicitud GET al endpoint (se interceptará y se devolverá el mock)
    const response = await page.request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
    
    // Validamos el estado de la respuesta
    expect(response.status()).toBe(200);
    console.log(`Estado de la respuesta: ${response.status()}`); // Imprime el estado HTTP

    // Obtenemos y validamos el cuerpo de la respuesta
    interface Pet {
        id: number;
        name: string;
        status: string;
    }

    const pets: Pet[] = await response.json();
    pets.forEach((pet: Pet) => expect(pet.status).toBe('available'));

    // Imprimimos los datos de las primeras mascotas
    console.log('Mascotas disponibles (parcial):');
    pets.slice(0, 2).forEach((pet: Pet) => {
        console.log(`- Mascota: ID=${pet.id}, Nombre=${pet.name}, Estado=${pet.status}`);
    });

    console.log('TC6 completado: Validación exitosa de mascotas disponibles.');
});
