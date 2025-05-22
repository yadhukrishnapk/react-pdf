import { Invoice,InvoiceItem, TotalItem } from "../../types/invoice";

export const paginateTableData = (data: InvoiceItem[], rowsPerPage = 6): InvoiceItem[][] => {
  const pages: InvoiceItem[][] = [];
  for (let i = 0; i < data.length; i += rowsPerPage) {
    pages.push(data.slice(i, i + rowsPerPage));
  }
  return pages;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const createCombinedInvoice = (invoices: Invoice[]): Invoice => {
  const mergedItems: InvoiceItem[] = [];

  invoices.forEach(invoice => {
    invoice.items.forEach(item => {
      mergedItems.push({
        ...item,
        description: `${item.description} `,
      });
    });
  });

  const subtotal = mergedItems.reduce((sum, item) => sum + item.total, 0);

  const taxRate = 0.15;
  const taxAmount = subtotal * taxRate;

  const totalAmount = subtotal + taxAmount;

  const combinedTotals: TotalItem[] = [
    {
      _id: 'combined-subtotal',
      label: 'Subtotal',
      value: `$${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      _id: 'combined-tax',
      label: `Tax (${(taxRate * 100).toFixed(0)}%)`,
      value: `$${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      _id: 'combined-total',
      label: 'Total',
      value: `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  ];

  return { 
    _id: 'combined-invoice',
    invoiceNumber: 'COMBINED-INV-' + new Date().getTime(),
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    items: mergedItems,
    totals: combinedTotals,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};