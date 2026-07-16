export function formatJP(number) {
  const numberFormatJP = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(number)
  return numberFormatJP;
}

export function formatUSD(number) {
  const numberFormatUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(number)
  return numberFormatUSD;
}

export function formatVND(number) {
  const numberFormatVND = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND"}).format(number);
  return numberFormatVND;
}