import basicSetup from "../wallet-setup/basic.setup";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";

const RK_CONNECT_BUTTON_ID = "rk-connect-button";
const RK_METAMASK_BUTTON_ID = "rk-wallet-option-metaMask";
const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TSender/);
});

test("should show the AirdropForm is connected, otherwise, not", async ({
  context,
  page,
  metamaskPage,
  extensionId,
}) => {
  await page.goto("/");

  // Expect the connect message to be display when not connected to a wallet
  await expect(page.getByText("Please connect")).toBeVisible();

  // Connect to metamask
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId
  );

  page.getByTestId(RK_CONNECT_BUTTON_ID).click();
  page.getByTestId(RK_METAMASK_BUTTON_ID).click();
  await metamask.connectToDapp();
  await expect(page.getByText("Token Address")).toBeVisible();
});
