const { getPrinters, print } = require("chrome-raw-print");

async function printRawText(text) {
  const printers = await getPrinters();
  const printerName = printers[0]?.name; // pilih printer pertama atau tentukan sendiri

  if (!printerName) throw new Error("No printer found!");

  await print({
    data: text,
    printer: printerName,
    type: "raw",
  });
}

module.exports = { printRawText };
