import { test, expect } from '@playwright/test';

test.describe('Punto 1: Estrategias de Localización en RWA', () => {

  test('Validación de cuatro elementos usando diferentes estrategias de localización', async ({ page }) => {
    await page.goto('/signin');

    // 1. getByLabel() -> Orientado a accesibilidad de formularios
    const usernameInput = page.getByLabel(/Username/i);
    await expect(usernameInput).toBeVisible();

    // 2. getByPlaceholder() o getByLabel() alternativo -> Enfoque de formulario
    const passwordInput = page.getByLabel(/^Password/i);
    await expect(passwordInput).toBeVisible();

    // 3. getByRole() -> Semántica ARIA
    const submitButton = page.getByRole('button', { name: /sign in/i });
    await expect(submitButton).toBeVisible();

    // 4. getByRole() de tipo enlace / getByText()
    const signUpLink = page.getByRole('link', { name: /don't have an account\? sign up/i });
    await expect(signUpLink).toBeVisible();
  });

});