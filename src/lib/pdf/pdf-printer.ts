export type PdfPrinterRequestBody = {
  /**
   * HTML string of content to convert to PDF.
   */
  html: string;

  /**
   * PDF printer settings.
   */
  pdfOptions: PdfPrinterRequestBodyPdfOptions;
};

/**
 * Puppeteer PDF export options.
 *
 * @see https://pptr.dev/api/puppeteer.pdfoptions
 */
export type PdfPrinterRequestBodyPdfOptions = {
  /**
   * Whether to show the header and footer.
   *
   * Default: `true`
   */
  displayHeaderFooter?: boolean;

  /**
   * HTML template for the print footer.
   *
   * Should be valid HTML with the following classes used to inject values into them:
   *   - `date` formatted print date
   *   - `title` document title
   *   - `url` document location
   *   - `pageNumber` current page number
   *   - `totalPages` total pages in the document
   *
   * ```html
   *   <div style="text-align: right; font-size: 12px;">
   *     <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>
   *   </div>
   * ```
   *
   * Default: " "
   */
  footerTemplate?: string;

  /**
   * Page format.
   *
   * Default: `A4`
   */
  format?: PdfPrinterRequestBodyPdfOptionsPaperFormat;

  /**
   * HTML template for the print header.
   *
   * Should be valid HTML with the following classes used to inject values into them:
   *   - `date` formatted print date
   *   - `title` document title
   *   - `url` document location
   *   - `pageNumber` current page number
   *   - `totalPages` total pages in the document
   *
   * ```html
   *   <div style="text-align: right; font-size: 12px;">
   *     <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>
   *   </div>
   * ```
   *
   * Default: " "
   */
  headerTemplate?: string;

  /**
   * Sets the height of paper. You can pass in a number or a string with a unit.
   */
  height?: number | string;

  /**
   * Whether to print in landscape orientation.
   *
   * Default: `false`
   */
  landscape?: boolean;

  /**
   * Set the PDF margins.
   *
   * Default: `undefined` no margins are set.
   */
  margin?: {
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
    top?: number | string;
  };

  /**
   * Hides default white background and allows generating pdfs with transparency.
   *
   * Default: `false`
   */
  omitBackground?: boolean;

  /**
   * Generate document outline.
   *
   * Default: `false`
   */
  outline?: boolean;

  /**
   * Paper ranges to print, e.g. `1-5, 8, 11-13`.
   *
   * `undefined` or the empty string, means all pages are printed.
   *
   * Defautl: `""`
   */
  pageRanges?: string;

  /**
   * The path to save the file to.
   *
   * Default: `undefined`, which means the PDF will not be written to disk.
   *
   * @deprecated Is not supported in service call.
   */
  path?: string;

  /**
   * Give any CSS `@page` size declared in the page priority over what is declared
   * in the `width` or `height` or `format` option.
   *
   * Default: `false`, which will scale the content to fit the paper size.
   */
  preferCSSPageSize?: boolean;

  /**
   * Set to `true` to print background graphics.
   *
   * Default: `true`
   */
  printBackground?: boolean;

  /**
   * Scales the rendering of the web page. Amount must be between `0.1` and `2`.
   *
   * Default: `1`
   */
  scale?: number;

  /**
   * Generate tagged (accessible) PDF.
   *
   * Default: `true`
   */
  tagged?: boolean;

  /**
   * Timeout in milliseconds. Pass `0` to disable timeout.
   *
   * Defatul: `30000` (30s)
   */
  timeout?: number;

  /**
   * Sets the width of paper. You can pass in a number or a string with a unit.
   */
  width?: number | string;
};

export type PdfPrinterRequestBodyPdfOptionsPaperFormat =
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "Ledger"
  | "Legal"
  | "Letter"
  | "Tabloid";
