import { test, expect } from '@playwright/test';

test.describe('Punto 2: Ejecución de Acciones e Interacciones', () => {

  test('Flujo de acciones múltiples en formulario de inicio de sesión y registro', async ({ page }) => {
    // 1. Navegación
    await page.goto('/signin');

    // Acción 1: fill() 
    await page.getByLabel(/Username/i).fill('Katharina_Bernier');

    // Acción 2: check() -> Manipulación semántica de checkbox
    const rememberMe = page.getByRole('checkbox', { name: /remember me/i });
    await rememberMe.check();
    await expect(rememberMe).toBeChecked();

    // Acción 3: press() -> Envío de tecla individual para control de foco
    const passwordInput = page.getByLabel(/^Password/i);
    await passwordInput.fill('s3cret');
    await passwordInput.press('Tab');

    // Acción 4: click() -> Interacción sobre botón interactivo
    await page.getByRole('button', { name: /sign in/i }).click();

    // Verificación de redirección
    await expect(page).toHaveURL('/');
  });

});