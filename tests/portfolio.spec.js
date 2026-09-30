import { test, expect } from "@playwright/test";

test.describe("Iron Man Living Machine Portfolio Tests", () => {
  test("Desktop Viewport (1440x900) - Full Page Verification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:5173/");

    // Wait for boot sequence and bypass it
    const skipBtn = page.locator(".boot-skip-btn");
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    }

    // Verify header navigation and status
    await expect(page.locator(".brand-title")).toHaveText("DEEPAK KUMAR");
    await expect(page.locator(".system-status-pill")).toBeVisible();

    // Verify Sector 01: Core Command Deck & 3D Arc Reactor
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator(".arc-reactor-canvas-mount")).toBeVisible();
    await expect(page.locator(".developer-name")).toContainText("Deepak Kumar");
    await expect(page.locator(".btn-overcharge")).toBeVisible();

    // Verify Spider-Man Recon Web in top-right corner
    await expect(page.locator(".spider-web-corner")).toBeVisible();
    await expect(page.locator(".spider-web-canvas")).toBeVisible();

    // Verify SPARK is stationed on the gantry catwalk
    await expect(page.locator(".bot-spark-gantry")).toBeVisible();

    // Take Desktop Hero Screenshot
    await page.screenshot({ path: "test-results/desktop-hero-1440.png" });

    // Click SPARK to verify speech bubble
    await page.locator(".bot-spark-gantry").click();
    await expect(page.locator(".spark-bubble")).toBeVisible();

    // Scroll to Mission Control & Skills
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.locator(".mission-control-table-section")).toBeVisible();
    await expect(page.locator(".sub-cabin-card")).toHaveCount(4);
    await page.screenshot({ path: "test-results/desktop-skills-1440.png" });

    // Scroll to Projects
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.locator(".project-bay-module")).toHaveCount(4);
    await page.screenshot({ path: "test-results/desktop-projects-1440.png" });

    // Scroll to Contact
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator(".stark-comms-form")).toBeVisible();
    await page.screenshot({ path: "test-results/desktop-contact-1440.png" });

    // Open J.A.R.V.I.S. AI Interface
    const jarvisOrb = page.locator(".jarvis-floating-orb");
    await expect(jarvisOrb).toBeVisible();
    await jarvisOrb.click();
    await expect(page.locator(".jarvis-console-window")).toBeVisible();
    await page.screenshot({ path: "test-results/desktop-jarvis-1440.png" });
  });

  test("Mobile Viewport (390x844) - Responsive Layout Verification", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:5173/");

    const skipBtn = page.locator(".boot-skip-btn");
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    }

    // Verify Mobile Layout elements
    await expect(page.locator(".developer-name")).toBeVisible();
    await expect(page.locator(".arc-reactor-canvas-mount")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Take Mobile Screenshot
    await page.screenshot({ path: "test-results/mobile-390.png" });
  });
});
