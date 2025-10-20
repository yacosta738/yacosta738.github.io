from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        # Use a mobile device profile
        pixel_5 = p.devices['Pixel 5']
        browser = p.webkit.launch(headless=True)
        context = browser.new_context(**pixel_5)
        page = context.new_page()

        # Navigate to the local preview server
        page.goto("http://localhost:4321")

        # Wait for the menu button to be visible
        menu_button = page.locator("#" + "drawer-menu-button-box").first
        expect(menu_button).to_be_visible(timeout=15000)

        # Take a screenshot of the header area
        header_element = page.locator("header").first
        if not header_element:
            header_element = page.locator("body") # Fallback to body if header not found

        header_element.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()