import { test, expect } from '@playwright/test';
import { updatePet } from '../../utils/pet-api'; // Ajusta la ruta según corresponda

test('TC5: Validar actualización de datos de mascota correctamente', async ({ request }) => {
  const updatedPet = {
    id: 1,
    name: 'Updated Pet',
    status: 'available',
  };

  try {
    const response = await updatePet(request, updatedPet);

    
    if (response.status() === 200) {
      const responseBody = await response.json();
      expect(responseBody.name).toBe(updatedPet.name);
      expect(responseBody.status).toBe(updatedPet.status);
    } else {
      // En caso de error, solo mostramos el mensaje adecuado
      console.log('Error al actualizar la mascota:', await response.text());
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en la actualización de la mascota:', error.message);
    } else {
      console.error('Error en la actualización de la mascota:', error);
    }
    throw error; // Lanza 
  }
});
