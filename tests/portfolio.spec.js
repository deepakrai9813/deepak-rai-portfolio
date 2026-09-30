import { test, expect } from "@playwright/test";

test.describe("Senior Developer Portfolio (Obsidian Dark Luxury Bento)", () => {
  test("Desktop Viewport (1440x900) - Complete Structure & Interaction Verification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:5173/");

    // 1. Floating Island Navbar Verification
    const nav = page.locator(".floating-navbar-pill");
    await expect(nav).toBeVisible();
    await expect(nav.locator(".brand-symbol-badge")).toHaveText("DK");
    await expect(page.locator(".brand-text-name")).toHaveText("Deepak Kumar");
    await expect(page.locator(".btn-cmd-shortcut")).toBeVisible();
    await expect(page.locator(".btn-nav-resume")).toBeVisible();

    // 2. Hero Section Verification
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(page.locator(".hero-status-pill")).toContainText("Available for Senior / Full-Stack Roles");
    await expect(page.locator(".hero-main-title")).toBeVisible();
    await expect(page.locator(".hero-cli-badge")).toBeVisible();
    await expect(page.locator(".hero-stats-ribbon .hero-stat-card")).toHaveCount(4);

    // 3. Bento About & Architecture Topology Verification
    const about = page.locator("#about");
    await expect(about).toBeVisible();
    await expect(page.locator(".bento-tile")).toHaveCount(4);
    await expect(page.locator(".live-clock-badge")).toBeVisible();
    await expect(page.locator(".architecture-topology-card")).toBeVisible();
    await expect(page.locator(".topology-node-btn")).toHaveCount(5);

    // 4. Projects Showcase Verification
    const projects = page.locator("#projects");
    await expect(projects).toBeVisible();
    await expect(page.locator(".project-showcase-card")).toHaveCount(4);
    await expect(page.locator(".project-browser-bar")).toHaveCount(4);

    // 5. Test Case Study Modal
    const firstCaseStudyBtn = page.locator(".btn-case-study").first();
    await firstCaseStudyBtn.click();
    const modal = page.locator(".case-study-dialog");
    await expect(modal).toBeVisible();
    await expect(modal.locator("h2")).toContainText("San Brothers");
    await page.locator(".btn-close-modal").click();
    await expect(modal).not.toBeVisible();

    // 6. Experience Timeline Verification
    const exp = page.locator("#experience");
    await expect(exp).toBeVisible();
    await expect(page.locator(".timeline-role-item")).toHaveCount(3);

    // 7. Interactive Developer Terminal Verification
    const terminal = page.locator("#terminal");
    await expect(terminal).toBeVisible();
    await expect(page.locator(".terminal-widget-container")).toBeVisible();
    // Test clicking a terminal chip
    const metricsChip = page.locator(".terminal-chip-btn", { hasText: "curl /metrics" });
    await metricsChip.click();
    await expect(page.locator(".terminal-log-row.output").last()).toContainText("cluster_uptime");

    // 8. Skills Matrix Verification
    const skills = page.locator("#skills");
    await expect(skills).toBeVisible();
    await expect(page.locator(".skills-category-card")).toHaveCount(4);

    // 9. Testimonials Verification
    const testimonials = page.locator("#testimonials");
    await expect(testimonials).toBeVisible();
    await expect(page.locator(".testimonial-card")).toHaveCount(3);

    // 10. Contact Section Verification
    const contact = page.locator("#contact");
    await expect(contact).toBeVisible();
    await expect(page.locator(".contact-method-card")).toHaveCount(4);
    await expect(page.locator(".contact-form-card")).toBeVisible();

    // 11. Command Palette (⌘K) Modal Verification
    await page.locator(".btn-cmd-shortcut").click();
    const cmdPalette = page.locator(".cmd-palette-dialog");
    await expect(cmdPalette).toBeVisible();
    await page.locator(".cmd-search-input").fill("Projects");
    await expect(page.locator(".cmd-item-row").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(cmdPalette).not.toBeVisible();

    // 12. Footer Verification
    const footer = page.locator(".portfolio-footer-bar");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Deepak Kumar");

    // Take Desktop Full Page Screenshot
    await page.screenshot({ path: "test-results/portfolio-desktop.png", fullPage: true });
  });

  test("Mobile Viewport (390x844) - Responsive Flow Verification", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:5173/");

    // Verify key elements load cleanly on mobile
    await expect(page.locator(".floating-navbar-pill")).toBeVisible();
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator(".architecture-topology-card")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#terminal")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#testimonials")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Take Mobile Screenshot
    await page.screenshot({ path: "test-results/portfolio-mobile.png", fullPage: true });
  });
});
