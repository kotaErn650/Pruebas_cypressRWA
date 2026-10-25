import { test, expect } from '@playwright/test';

test.describe('Pruebas BVA - Campo Password en Registro de Usuarios', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Navegar a la página de registro
    await page.goto('/signup');
    await expect(page).toHaveURL(/.*signup/);
  });

  test('TC-BVA-01: [Below Boundary - 3 caracteres] Debe rechazar la contraseña y mostrar mensaje de error', async ({ page }) => {
    await page.getByLabel(/First Name/i).fill('Carlos');
    await page.getByLabel(/Last Name/i).fill('Perez');
    await page.getByLabel(/Username/i).fill('cperez_bva3');

    // Ingresar 3 caracteres (inferior al mínimo permitido de 4)
    const passwordField = page.getByLabel(/^Password/i);
    await passwordField.fill('abc');
    await passwordField.blur();

    // Validar mensaje de error
    const errorMsg = page.locator('#password-helper-text');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(/Password must contain at least 4 characters/i);

    // Validar que el botón Sign Up permanezca deshabilitado
    const submitBtn = page.getByRole('button', { name: /sign up/i });
    await expect(submitBtn).toBeDisabled();
  });

  test('TC-BVA-02: [Boundary - 4 caracteres] Debe permitir registro con la longitud mínima exacta', async ({ page }) => {
    const uniqueUser = `user_${Date.now()}`;
    await page.getByLabel(/First Name/i).fill('Maria');
    await page.getByLabel(/Last Name/i).fill('Gomez');
    await page.getByLabel(/Username/i).fill(uniqueUser);

    // Ingresar exactamente 4 caracteres
    await page.getByLabel(/^Password/i).fill('abcd');
    await page.getByLabel(/Confirm Password/i).fill('abcd');

    const submitBtn = page.getByRole('button', { name: /sign up/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Redirección exitosa a /signin
    await expect(page).toHaveURL(/.*signin/);
  });

  test('TC-BVA-03: [Above Boundary - 5 caracteres] Debe permitir registro con un valor justo encima del límite', async ({ page }) => {
    const uniqueUser = `user_${Date.now()}`;
    await page.getByLabel(/First Name/i).fill('Laura');
    await page.getByLabel(/Last Name/i).fill('Rios');
    await page.getByLabel(/Username/i).fill(uniqueUser);

    // Ingresar 5 caracteres
    await page.getByLabel(/^Password/i).fill('abcde');
    await page.getByLabel(/Confirm Password/i).fill('abcde');

    const submitBtn = page.getByRole('button', { name: /sign up/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    await expect(page).toHaveURL(/.*signin/);
  });
});