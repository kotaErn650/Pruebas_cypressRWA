import { test, expect } from '@playwright/test';

test.describe('Punto 1: Estrategias de Localización en RWA', () => {

  test('Validación de cuatro elementos usando diferentes estrategias de localización', async ({ page }) => {
    await page.goto('/signin');

    // 1. getByLabel() -> Orientado a accesibilidad de formularios
    // Justificación: Asocia directamente el campo interactivo con su etiqueta 'Username', simulando cómo un usuario busca el campo.
    const usernameInput = page.getByLabel(/Username/i);
    await expect(usernameInput).toBeVisible();

    // 2. getByPlaceholder() o getByLabel() alternativo -> Enfoque de formulario
    // Justificación: 'Password' es un input crítico de autenticación cuya semántica se captura con exactitud mediante su etiqueta visible.
    const passwordInput = page.getByLabel(/^Password/i);
    await expect(passwordInput).toBeVisible();

    // 3. getByRole() -> Semántica ARIA
    // Justificación: 'button' con nombre accesible 'Sign In' verifica el rol funcional interactivo sin importar IDs ni clases CSS.
    const submitButton = page.getByRole('button', { name: /sign in/i });
    await expect(submitButton).toBeVisible();

    // 4. getByRole() de tipo enlace / getByText()
    // Justificación: Captura el enlace de navegación para registrarse por su texto interactivo accesible visible al usuario.
    const signUpLink = page.getByRole('link', { name: /don't have an account\? sign up/i });
    await expect(signUpLink).toBeVisible();
  });

});