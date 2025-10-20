from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto("http://localhost:4321", timeout=60000)
    page.wait_for_load_state("networkidle")
    page.screenshot(path="jules-scratch/verification/bug_screenshot.png")
    browser.close()