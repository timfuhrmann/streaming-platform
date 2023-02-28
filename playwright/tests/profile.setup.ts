import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/profile.json";

setup("choose profile", async ({ page }) => {
    await page.goto("/profile");
    await page.getByRole("link", { name: /Hwang/ }).click();
    await expect(page).toHaveURL("/", { timeout: 10000 });

    await page.context().storageState({ path: authFile });
});
