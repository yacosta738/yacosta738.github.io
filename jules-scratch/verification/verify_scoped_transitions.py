
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Set dark theme
        page.goto("http://localhost:4322")
        page.evaluate("() => { localStorage.setItem('theme', 'dark'); document.documentElement.classList.add('dark'); }")


        # Navigate to blog and take screenshot
        page.goto("http://localhost:4322")
        page.get_by_role("link", name="Blog").first.click()
        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/blog_transition.png")

        # Navigate to a non-blog page and take screenshot
        page.get_by_role("link", name="About").first.click()
        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/about_no_transition.png")

        browser.close()

run()
