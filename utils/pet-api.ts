import { APIRequestContext } from '@playwright/test';// pet-api.ts
export async function createPet(data: object): Promise<Response> {
    const response = await fetch('https://petstore.swagger.io/v2/pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response;
}

export const updatePet = async (request: APIRequestContext, petData: any) => {
    const response = await request.put('/pet', {
        data: petData,
    });

    switch (response.status()) {
        case 200:
            console.log('Pet updated successfully');
            return response;
        case 400:
            console.log('Invalid ID supplied');
            return response;
        case 404:
            console.log('Pet not found');
            return response;
        case 405:
            console.log('Método PUT no permitido en este endpoint');
            return response;
        default:
            throw new Error(`Unexpected status code: ${response.status()}`);
    }
};
  
