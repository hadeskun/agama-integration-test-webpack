import { type Page } from "puppeteer-core";
import { getTextContent } from "../lib/helpers";

export class InstallationJsonPage {
  protected readonly page: Page;

  protected readonly downloadJsonButton = () =>
    this.page.locator("::-p-aria(Download configuration)");

  protected readonly closeButton = () => this.page.locator("::-p-aria(Close)");

  protected readonly jsonEditor = () => this.page.locator('::-p-aria([role="textbox"])');

  protected readonly jsonContent = () => this.page.locator(".view-lines");

  constructor(page: Page) {
    this.page = page;
  }

  async downloadJsonFile() {
    await this.downloadJsonButton().click();
  }

  async closeJsonFile() {
    await this.closeButton().click();
    await this.page.waitForSelector('div[role="dialog"]', { hidden: true });
  }

  async ensureJsonVisible(timeout: number = 30 * 1000) {
    await this.jsonEditor().setTimeout(timeout).wait();
  }

  async readJsonContent(timeout: number = 30 * 1000): Promise<string> {
    await this.ensureJsonVisible(timeout);

    const jsonContent = await getTextContent(this.jsonContent(), timeout);
    return jsonContent.replace(/ /g, " ");
  }
}
