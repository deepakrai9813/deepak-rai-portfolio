import { test, expect } from "@playwright/test";

test.describe("Iron Man Living Machine Workshop Command Center Tests", () => {
  test("Desktop Viewport (1440x900) - Exact Reference Layout Verification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:5173/");

    // Wait for boot sequence and bypass it
    const skipBtn = page.locator(".boot-skip-btn");
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    }

    // 1. Verify Top Navigation
    await expect(page.locator(".brand-name")).toHaveText("Deepak Kumar");
    await expect(page.locator(".audio-status-pill")).toBeVisible();

    // 2. Verify Profile HUD (Top-Left)
    await expect(page.locator(".profile-hud")).toBeVisible();
    await expect(page.locator(".hud-name")).toHaveText("Deepak Kumar");

    // 3. Verify Center IRON HEART Superstructure
    await expect(page.locator(".iron-heart-housing")).toBeVisible();
    await expect(page.locator(".maintenance-bay-hud")).toBeVisible();
    await expect(page.locator(".planning-catwalk-gantry")).toBeVisible();

    // 4. Verify Skills Console (Mid-Left)
    await expect(page.locator(".skills-hud")).toBeVisible();
    await expect(page.locator(".skill-rack-btn")).toHaveCount(8);

    // 5. Verify Experience Terminal (Bottom-Left)
    await expect(page.locator(".experience-hud")).toBeVisible();

    // 6. Verify J.A.R.V.I.S. AI Terminal (Upper-Right)
    await expect(page.locator(".jarvis-hud-terminal")).toBeVisible();
    await expect(page.locator(".btn-talk-jarvis")).toBeVisible();

    // 7. Verify Projects Bay (Top-Right)
    await expect(page.locator(".projects-hud")).toBeVisible();
    await expect(page.locator(".project-row-item")).toHaveCount(3);

    // 8. Verify Contact Terminal (Mid-Right)
    await expect(page.locator(".contact-hud")).toBeVisible();

    // 9. Verify Code Base Terminal (Bottom-Right)
    await expect(page.locator(".codebase-hud")).toBeVisible();

    // 10. Verify Data Flow & Resume (Bottom-Center)
    await expect(page.locator(".dataflow-resume-terminal")).toBeVisible();
    await expect(page.locator(".btn-download-resume")).toBeVisible();

    // 11. Verify Spider-Man 5% Accents
    await expect(page.locator(".corner-spider-web.top-right")).toBeVisible();
    await expect(page.locator(".corner-spider-web.bottom-right")).toBeVisible();

    // Test Iron Heart Overcharge click
    await page.locator(".iron-heart-housing").click();
    await expect(page.locator(".iron-heart-housing")).toHaveClass(/overcharged/);

    // Capture Full Desktop Command Center Screenshot
    await page.screenshot({ path: "test-results/command-center-desktop.png" });

    // Test Project Click opens Case Study Modal
    await page.locator(".project-row-item").first().click();
    await expect(page.locator(".stark-modal-card")).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({ path: "test-results/modal-project-view.png" });
    await page.locator(".modal-close-btn").click();

    // Test Contact Me opens Contact Modal
    await page.locator(".btn-hud.secondary").click();
    await expect(page.locator(".contact-modal-card")).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({ path: "test-results/modal-contact-view.png" });
    await page.locator(".modal-close-btn").click();
  });

  test("Mobile Viewport (390x844) - Responsive Deck Verification", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:5173/");

    const skipBtn = page.locator(".boot-skip-btn");
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    }

    // Verify key mobile elements
    await expect(page.locator(".profile-hud")).toBeVisible();
    await expect(page.locator(".iron-heart-housing")).toBeVisible();
    await expect(page.locator(".skills-hud")).toBeVisible();
    await expect(page.locator(".projects-hud")).toBeVisible();

    await page.screenshot({ path: "test-results/command-center-mobile.png" });
  });
});
