import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Emulate a mobile device
        await page.set_viewport_size({"width": 375, "height": 812})

        try:
            await page.goto("http://localhost:4321", wait_until="networkidle")
        except Exception as e:
            print(f"Failed to load page: {e}")
            await browser.close()
            return

        # Give the page some time to load just in case networkidle is not enough
        await page.wait_for_timeout(5000)

        # Take a screenshot of the full page
        await page.screenshot(path="screenshot.png", full_page=True)
        print("Screenshot taken and saved to screenshot.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())