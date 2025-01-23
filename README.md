# Playwright API PetStore CI/CD Allure

Este proyecto es un marco de pruebas end-to-end integral para la API de PetStore, que aprovecha Playwright TypeScript, las pruebas de API de Postman y el informe de Allure.

## Características Clave

- **Pruebas de API de Playwright**: Pruebas de API completas para la API de PetStore, que cubren operaciones CRUD y casos extremos.
- **Integración de API de Postman**: Integración con Postman para pruebas de API adicionales, lo que permite un uso sencillo de las colecciones de Postman existentes.
- **Informes de Allure**: Informes de prueba detallados generados utilizando el framework Allure, que proporcionan información detallada sobre la ejecución y los resultados de las pruebas.
- **Integración de CI/CD**: Flujo de trabajo de pruebas y generación de informes automatizado, integrado con GitHub Actions, lo que permite la integración y entrega continuas.

## Estructura del Proyecto

- `allure-report/`: Carpeta para los informes de Allure generados
- `allure-results/`: Carpeta para los resultados de las pruebas de Allure
- `fixtures/`: Datos de prueba
- `node_modules/`: Dependencias de Node.js
- `requests/`: Solicitudes de API de Postman
- `tests/`: Conjuntos de pruebas de API de Playwright
- `utils/`: Funciones de utilidad
- `playwright.config.ts`: Archivo de configuración de Playwright
- `package.json`: Información del paquete NPM
- `package-lock.json`: Dependencias de NPM bloqueadas
- `regression.yml`: Flujo de trabajo de GitHub Actions para CI/CD
- `tsconfig.json`: Configuración de TypeScript

## Ejecución de las Pruebas

1. Instala las dependencias:
   ```bash
   npm ci
   ```
2. Instala los navegadores de Playwright:
   ```bash
   npx playwright install --with-deps
   ```
3. Ejecuta las pruebas de Playwright:
   ```bash
   npx playwright test
   ```

## Generación del Informe de Allure

1. Instala la herramienta de línea de comandos de Allure:
   ```bash
   npm install -g allure-commandline
   ```
2. Genera el informe de Allure:
   ```bash
   allure generate allure-results -o allure-report --clean
   ```
3. Sirve el informe de Allure:
   ```bash
   allure open allure-report
   ```

## CI/CD con GitHub Actions

El proyecto incluye un flujo de trabajo de GitHub Actions definido en el archivo `regression.yml`. Este flujo de trabajo ejecuta automáticamente las pruebas de Playwright y genera el informe de Allure cuando se realizan cambios en la rama `main` o `master`, o cuando se abre una solicitud de extracción (pull request) contra estas ramas.

El informe de Allure generado se publica en el sitio de GitHub Pages del proyecto, lo que lo hace accesible en: https://e-gregorio.github.io/Playwright-API-PetStore-CI-CD-Allure/

## Próximos Pasos

- Ampliar la cobertura de las pruebas para incluir más escenarios y casos extremos
- Integrar las pruebas de API de Postman sin problemas en el marco de Playwright
- Explorar la personalización avanzada y la integración del informe de Allure
