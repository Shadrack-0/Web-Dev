export type Currency = "KES" | "USD";

const EXCHANGE_RATE_KES_PER_USD = 128; // Standard conversion benchmark

export const CurrencyService = {
  getCurrency(): Currency {
    try {
      const saved = localStorage.getItem("chalcedony_currency");
      return (saved === "USD" ? "USD" : "KES") as Currency;
    } catch {
      return "KES";
    }
  },

  setCurrency(curr: Currency): void {
    localStorage.setItem("chalcedony_currency", curr);
    window.dispatchEvent(new Event("chalcedony_currency_change"));
  },

  format(kesAmount: number, targetCurrency: Currency = this.getCurrency(), customUsdAmount?: number): string {
    if (targetCurrency === "USD") {
      const usd = customUsdAmount || Math.round(kesAmount / EXCHANGE_RATE_KES_PER_USD);
      return `$${usd.toLocaleString()}`;
    }
    return `KES ${kesAmount.toLocaleString()}`;
  }
};
