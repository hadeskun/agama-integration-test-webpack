import { type Page } from "puppeteer-core";

export class ZfcpPage {
  private readonly page: Page;

  private readonly faDisk = () => this.page.locator(".pf-v6-c-check__input:first-of-type");

  private readonly fcDisk = () =>
    this.page.locator(".pf-v6-c-form__group:nth-of-type(2) .pf-v6-c-check__input");

  private readonly backButton = () => this.page.locator("button::-p-text(Back)");

  private readonly enableMultipath = () => this.page.locator("::-p-text('Yes')");

  constructor(page: Page) {
    this.page = page;
  }

  async activateDevice(channelId: string) {
    const rowActions = channelId === "0.0.fa00" ? this.faDisk() : this.fcDisk();
    await rowActions.click();
  }

  async activateMultipath() {
    await this.enableMultipath().setTimeout(40000).click();
  }

  async back() {
    await this.backButton().click();
  }
}
