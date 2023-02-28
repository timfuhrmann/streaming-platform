import { test } from "@playwright/test";

//@todo write more tests
test("should have watchlist", async ({ page }) => {
    await page.goto("/");
    await page.getByText(/Your watchlist/);
});
