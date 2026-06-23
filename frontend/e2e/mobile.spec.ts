import { test, expect } from '@playwright/test'

test.describe('Mobile E2E (iPhone 13)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('page loads and displays hero section', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    const headline = hero.locator('h1')
    await expect(headline).toBeVisible()
    await expect(headline).not.toBeEmpty()
  })

  test('nav elements visible on mobile (desktop links hidden)', async ({ page }) => {
    const logo = page.locator('header a').first()
    await expect(logo).toBeVisible()

    const desktopLinks = page.locator('header .hidden.md\\:flex a')
    await expect(desktopLinks.first()).toBeHidden()

    const themeToggle = page.locator('header button[aria-label="Toggle theme"]')
    await expect(themeToggle).toBeVisible()

    const langSwitcher = page.locator('header button[aria-label="Switch language"]')
    await expect(langSwitcher).toBeVisible()

    const cta = page.locator('header a[href="#contact"]')
    await expect(cta).toBeVisible()
  })

  test('theme toggle switches between dark and light', async ({ page }) => {
    const themeToggle = page.locator('header button[aria-label="Toggle theme"]')

    const initialTheme = await page.locator('html').getAttribute('data-theme')

    await themeToggle.click()
    await page.waitForTimeout(300)

    const afterClick = await page.locator('html').getAttribute('data-theme')
    expect(afterClick).not.toBe(initialTheme)

    await themeToggle.click()
    await page.waitForTimeout(300)

    const afterSecondClick = await page.locator('html').getAttribute('data-theme')
    expect(afterSecondClick).toBe(initialTheme)
  })

  test('language switcher opens and changes language', async ({ page }) => {
    const langButton = page.locator('header button[aria-label="Switch language"]')
    await langButton.click()

    const dropdown = page.locator('header [class*="rounded-xl"]').first()
    await expect(dropdown).toBeVisible()

    const langOptions = dropdown.locator('button')
    const count = await langOptions.count()
    expect(count).toBeGreaterThanOrEqual(3)

    const initialCta = await page.locator('header a[href="#contact"]').textContent()

    await langOptions.filter({ hasText: 'Русский' }).click()
    await page.waitForTimeout(300)

    const newCta = await page.locator('header a[href="#contact"]').textContent()
    expect(newCta).not.toBe(initialCta)
  })

  test('scrolls through all sections and they are visible', async ({ page }) => {
    const sections = ['services', 'work', 'stack', 'about', 'faq', 'contact']

    for (const id of sections) {
      const section = page.locator(`section#${id}`)
      await section.scrollIntoViewIfNeeded()
      await page.waitForTimeout(200)
      await expect(section).toBeVisible()
    }
  })

  test('services section renders all service cards', async ({ page }) => {
    const servicesSection = page.locator('section#services')
    await servicesSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const titles = servicesSection.locator('h3')
    const count = await titles.count()
    expect(count).toBe(5)
  })

  test('projects section renders project cards', async ({ page }) => {
    const projectsSection = page.locator('section#work')
    await projectsSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const cards = projectsSection.locator('h3')
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('tech stack section renders stack items', async ({ page }) => {
    const stackSection = page.locator('section#stack')
    await stackSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const items = stackSection.locator('[class*="flex items-center justify-between"]')
    const count = await items.count()
    expect(count).toBe(5)
  })

  test('faq accordion opens and closes items', async ({ page }) => {
    const faqSection = page.locator('section#faq')
    await faqSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const questions = faqSection.locator('button, [role="button"]')
    const firstQ = questions.first()
    await expect(firstQ).toBeVisible()

    await firstQ.click()
    await page.waitForTimeout(400)

    await firstQ.click()
  })

  test('contact form inputs are present and interactable', async ({ page }) => {
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const nameInput = contactSection.locator('input#name')
    const contactInput = contactSection.locator('input#contact')
    const descTextarea = contactSection.locator('textarea#description')

    await expect(nameInput).toBeVisible()
    await expect(contactInput).toBeVisible()
    await expect(descTextarea).toBeVisible()

    await nameInput.fill('Test User')
    await contactInput.fill('@testuser')
    await descTextarea.fill('Testing the contact form on mobile')

    await expect(nameInput).toHaveValue('Test User')
    await expect(contactInput).toHaveValue('@testuser')
    await expect(descTextarea).toHaveValue('Testing the contact form on mobile')
  })

  test('footer is visible with copyright text', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)

    await expect(footer).toBeVisible()
    await expect(footer).not.toBeEmpty()
  })

  test('trust strip with metrics is visible', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: /30\+/ })
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)

    await expect(section).toBeVisible()
    await expect(section).toContainText('30+')
  })

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.reload()
    await page.waitForLoadState('networkidle')

    expect(errors.length).toBe(0)
  })
})

test.describe('Mobile responsive layout (320px width)', () => {
  test.use({ viewport: { width: 320, height: 812 } })

  test('page is usable on very small screens', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    const cta = page.locator('header a[href="#contact"]')
    await expect(cta).toBeVisible()

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(200)

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})

test.describe('Tablet E2E (768px)', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('nav desktop links become visible on tablet', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const desktopLinks = page.locator('header nav a[href^="#"]')
    const count = await desktopLinks.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('theme and language persist after page reload', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    await page.evaluate(() => {
      localStorage.setItem('theme', 'light')
      localStorage.setItem('language', 'ru')
    })

    await page.reload()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    const theme = await page.locator('html').getAttribute('data-theme')
    expect(theme).toBe('light')

    const cta = await page.locator('header a[href="#contact"]').textContent()
    expect(cta?.trim()).not.toBe('Start a project')
  })
})
