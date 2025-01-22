import { test, expect } from '@playwright/test';

test('TC8: Validar obtención de detalles de mascota por ID válido', async ({ request }) => {
    
    await test.info().attach('Descripción del fallo - TC8', {
        body: `Durante la ejecución de la prueba TC8, se obtuvo un código de estado 404 en lugar de 200.
            La respuesta fue inesperada, ya que se esperaba un JSON válido con los detalles de la mascota.
            La API no está reconociendo el ID proporcionado, lo que resulta en un error 404 al intentar obtener los detalles de la mascota.
            Código de Respuesta Esperado: 200 (Éxito)
            Código de Respuesta Obtenido: 404 (No encontrado)
            URL de la Solicitud: GET https://petstore.swagger.io/v2/pet/{id}
            Recomendación: Verificar el comportamiento de la API al obtener detalles de una mascota con un ID válido.
            Es posible que el formato del ID o la forma en que se realiza la solicitud esté generando el error 404.`
        , contentType: 'text/plain'
    });

    const response = await request.get('https://petstore.swagger.io/v2/pet/1');

    // Validar  respuesta
    expect(response.status()).toBe(200);
    const petDetails = await response.json();
    expect(petDetails).toHaveProperty('id');
    expect(petDetails).toHaveProperty('category');
});
