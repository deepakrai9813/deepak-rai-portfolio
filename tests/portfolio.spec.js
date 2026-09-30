import { test, expect } from "@playwright/test";

test.describe("Senior Developer Portfolio (Bright & Fun Modernist)", () => {
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
    await expect(page.locator(".btn-nav-schedule")).toBeVisible();

    // 2. Hero Section Verification
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(page.locator(".hero-status-pill")).toContainText("Available for Senior / Full-Stack Roles");
    await expect(page.locator(".hero-main-title")).toBeVisible();
    await expect(page.locator(".hero-cli-badge")).toBeVisible();
    await expect(page.locator(".hero-stats-ribbon .hero-stat-card")).toHaveCount(4);
    await expect(page.locator(".btn-schedule-action")).toBeVisible();

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

    // 6. Architecture Modernization (Before vs After) Verification
    const archComp = page.locator("#architecture-comparison");
    await expect(archComp).toBeVisible();
    await expect(page.locator(".arch-side-card")).toHaveCount(2);
    await expect(page.locator(".arch-metric-card")).toHaveCount(4);
    await page.locator(".arch-view-btn.modern").click();
    await expect(page.locator(".arch-side-card.legacy-card")).toHaveClass(/dimmed/);
    await page.locator(".solution-tab-btn").nth(1).click();
    await expect(page.locator(".solution-tab-btn").nth(1)).toHaveClass(/active/);

    // 7. Architecture Decision Records (ADRs) Verification
    const adrs = page.locator("#adrs");
    await expect(adrs).toBeVisible();
    await expect(page.locator(".adr-card-item")).toHaveCount(4);
    await page.locator(".btn-read-adr").first().click();
    const adrModal = page.locator(".adr-modal-dialog");
    await expect(adrModal).toBeVisible();
    await expect(adrModal.locator(".adr-dialog-title")).toContainText("Redis Streams");
    await page.locator(".btn-close-adr-modal").click();
    await expect(adrModal).not.toBeVisible();

    // 8. Experience Timeline Verification
    const exp = page.locator("#experience");
    await expect(exp).toBeVisible();
    await expect(page.locator(".timeline-role-item")).toHaveCount(3);

    // 9. GitHub Activity Heatmap Verification
    const heatmap = page.locator("#heatmap");
    await expect(heatmap).toBeVisible();
    await expect(page.locator(".activity-heatmap-card")).toBeVisible();
    await expect(page.locator(".heatmap-cell").first()).toBeVisible();

    // 10. Project Scope Calculator Verification
    const calc = page.locator("#calculator");
    await expect(calc).toBeVisible();
    await expect(page.locator(".project-calculator-card")).toBeVisible();
    await page.locator(".calc-type-btn").nth(1).click();
    await expect(page.locator(".calc-type-btn").nth(1)).toHaveClass(/active/);

    // 11. Distributed Systems Chaos Simulator Verification
    const chaos = page.locator("#chaos-simulator");
    await expect(chaos).toBeVisible();
    await expect(page.locator(".chaos-dashboard-card")).toBeVisible();
    await page.locator(".chaos-btn.spike").click();
    await expect(page.locator(".chaos-btn.spike")).toHaveClass(/active/);
    await expect(page.locator(".log-row-item").last()).toBeVisible();
    await page.locator(".chaos-btn.reset").click();

    // 12. System Status & Incident Post-Mortem Dashboard Verification
    const systemStatus = page.locator("#system-status");
    await expect(systemStatus).toBeVisible();
    await expect(page.locator(".service-row-item")).toHaveCount(4);
    await expect(page.locator(".incident-card-item")).toHaveCount(2);
    await page.locator(".btn-read-rca").first().click();
    const rcaModal = page.locator(".rca-modal-dialog");
    await expect(rcaModal).toBeVisible();
    await expect(rcaModal.locator(".rca-title-text")).toContainText("Redis Connection Pool");
    await page.locator(".btn-close-rca-modal").click();
    await expect(rcaModal).not.toBeVisible();

    // 13. Interactive Developer Terminal Verification
    const terminal = page.locator("#terminal");
    await expect(terminal).toBeVisible();
    await expect(page.locator(".terminal-widget-container")).toBeVisible();
    const metricsChip = page.locator(".terminal-chip-btn", { hasText: "curl /metrics" });
    await metricsChip.click();
    await expect(page.locator(".terminal-log-row.output").last()).toContainText("cluster_uptime");

    // 14. Tech Playground & Code Inspector Verification
    const playground = page.locator("#tech-playground");
    await expect(playground).toBeVisible();
    await expect(page.locator(".playground-cat-btn")).toHaveCount(4);
    await page.locator(".playground-cat-btn").nth(1).click(); // Frontend
    await expect(page.locator(".pattern-select-btn").first()).toBeVisible();
    await expect(page.locator(".syntax-pre-block")).toBeVisible();
    await page.locator(".btn-copy-code").click();
    await expect(page.locator(".copied-text")).toBeVisible();

    // 15. Database Query Optimizer & Plan Visualizer Verification
    const queryOpt = page.locator("#query-optimizer");
    await expect(queryOpt).toBeVisible();
    await expect(page.locator(".scenario-pill-btn")).toHaveCount(3);
    await page.locator(".scenario-pill-btn").nth(1).click(); // Inventory
    await page.locator(".btn-run-explain").click();
    await expect(page.locator(".target-speedup-badge")).toBeVisible();
    await expect(page.locator(".query-code-pre.success")).toBeVisible();

    // 16. Skills Matrix Verification
    const skills = page.locator("#skills");
    await expect(skills).toBeVisible();
    await expect(page.locator(".skills-category-card")).toHaveCount(4);

    // 17. Certifications & Verified Badges Verification
    const certs = page.locator("#certifications");
    await expect(certs).toBeVisible();
    await expect(page.locator(".cert-card-item")).toHaveCount(4);
    await page.locator(".btn-cert-details").first().click();
    const certModal = page.locator(".cert-modal-dialog");
    await expect(certModal).toBeVisible();
    await expect(certModal.locator(".cert-dialog-title")).toContainText("AWS");
    await page.locator(".btn-close-cert-modal").click();
    await expect(certModal).not.toBeVisible();

    // 18. Testimonials Verification
    const testimonials = page.locator("#testimonials");
    await expect(testimonials).toBeVisible();
    await expect(page.locator(".testimonial-card")).toHaveCount(3);

    // 19. FAQ Accordion Verification
    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    await expect(page.locator(".faq-accordion-item")).toHaveCount(4);
    await page.locator(".faq-question-btn").nth(1).click();
    await expect(page.locator(".faq-answer-panel")).toBeVisible();

    // 20. Contact Section Verification
    const contact = page.locator("#contact");
    await expect(contact).toBeVisible();
    await expect(page.locator(".contact-method-card")).toHaveCount(4);
    await expect(page.locator(".contact-schedule-trigger-card")).toBeVisible();
    await expect(page.locator(".contact-form-card")).toBeVisible();

    // 21. Theme Palette Switcher Verification
    const paletteSwitcher = page.locator(".theme-palette-switcher");
    await expect(paletteSwitcher).toBeVisible();
    await page.locator(".palette-color-dot").nth(1).click(); // Coral
    await expect(page.locator("html")).toHaveAttribute("data-accent", "coral");
    await page.locator(".palette-color-dot").first().click(); // Indigo
    await expect(page.locator("html")).toHaveAttribute("data-accent", "indigo");

    // 22. Sound FX Widget Verification
    const soundToggle = page.locator(".btn-soundfx-toggle");
    await expect(soundToggle).toBeVisible();
    await soundToggle.click(); // toggle mute
    await soundToggle.click(); // toggle enable

    // 23. Schedule Meeting Modal Verification
    await page.locator(".btn-schedule-action").click();
    const schedModal = page.locator(".schedule-modal-dialog");
    await expect(schedModal).toBeVisible();
    await page.locator(".format-tile-btn").first().click();
    await expect(page.locator(".format-tile-btn").first()).toHaveClass(/active/);
    await page.locator(".btn-copy-agenda").click();
    await page.locator(".btn-close-schedule-modal").click();
    await expect(schedModal).not.toBeVisible();

    // 24. Press Kit & Briefing Modal Verification
    await page.locator(".footer-link-btn", { hasText: "Press Kit / Bio" }).click();
    const pressKit = page.locator(".presskit-modal-dialog");
    await expect(pressKit).toBeVisible();
    await page.locator(".length-pill").nth(0).click(); // Short
    await page.locator(".btn-copy-bio").click();
    await page.locator(".btn-close-presskit").click();
    await expect(pressKit).not.toBeVisible();

    // 25. Vibe Floating Widget
    await expect(page.locator(".vibe-floating-widget")).toBeVisible();

    // 26. Command Palette (⌘K) Modal Verification
    await page.locator(".btn-cmd-shortcut").click();
    const cmdPalette = page.locator(".cmd-palette-dialog");
    await expect(cmdPalette).toBeVisible();
    await page.locator(".cmd-search-input").fill("Projects");
    await expect(page.locator(".cmd-item-row").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(cmdPalette).not.toBeVisible();

    // 27. Footer Verification
    const footer = page.locator(".portfolio-footer-bar");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Deepak Kumar");

    // Scroll to top and take Desktop Full Page Screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
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
    await expect(page.locator("#architecture-comparison")).toBeVisible();
    await expect(page.locator("#adrs")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#heatmap")).toBeVisible();
    await expect(page.locator("#calculator")).toBeVisible();
    await expect(page.locator("#chaos-simulator")).toBeVisible();
    await expect(page.locator("#system-status")).toBeVisible();
    await expect(page.locator("#terminal")).toBeVisible();
    await expect(page.locator("#tech-playground")).toBeVisible();
    await expect(page.locator("#query-optimizer")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#certifications")).toBeVisible();
    await expect(page.locator("#testimonials")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator(".bottom-floating-controls-dock")).toBeVisible();

    // Scroll to top and take Mobile Screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: "test-results/portfolio-mobile.png", fullPage: true });
  });
});
