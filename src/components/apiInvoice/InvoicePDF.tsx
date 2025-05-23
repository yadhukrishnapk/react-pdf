import { Page, Text, View, Document } from '@react-pdf/renderer';
import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import { stylesapi } from './style/style';
import { Invoice, InvoiceItem } from '../../types/invoice';
import { formatDate, paginateTableData } from './invoiceUtils';
interface InvoicePDFProps {
  invoice: Invoice;
}
const styles = stylesapi;

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
  const paginatedData = paginateTableData(invoice.items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>API INVOICE</Text>
            <Text>{invoice.invoiceNumber}</Text>
            <Text style={styles.dates}>Issue Date: {formatDate(invoice.issueDate)}</Text>
            <Text style={styles.dates}>Due Date: {formatDate(invoice.dueDate)}</Text>
          </View>
          <View style={styles.headerCompanyInfo}>
            <Text style={styles.textBold}>Company Name</Text>
            <Text>123 Business Street</Text>
            <Text>City, State 12345</Text>
            <Text>contact@company.com</Text>
          </View>
        </View>

        <View style={styles.clientInfo}>
          <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
          <Text>Client Name</Text>
          <Text>Client Address</Text>
          <Text>City, State ZIP</Text>
          <Text>client@example.com</Text>
        </View>

        <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD style={styles.td}>Description</TD>
            <TD style={styles.td}>Quantity</TD>
            <TD style={styles.td}>Unit Price</TD>
            <TD style={styles.td}>Total</TD>
          </TH>
          {paginatedData[0].map((item: InvoiceItem) => (
            <TR key={item._id}>
              <TD style={styles.td}>
                <View style={styles.itemDescription}>
                  <Text style={styles.textBold}>{item.description}</Text>
                  {item.details && (
                    <Text style={styles.itemDescriptionDetails}>{item.details}</Text>
                  )}
                </View>
              </TD>
              <TD style={styles.td}>{item.quantity}</TD>
              <TD style={styles.td}>${item.unitPrice.toFixed(2)}</TD>
              <TD style={styles.td}>${item.total.toFixed(2)}</TD>
            </TR>
          ))}
        </Table>

        {paginatedData.length === 1 && (
          <View style={styles.totals}>
            <View style={{ minWidth: '256px' }}>
              {invoice.totals.map((item) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    padding: '6px',
                    backgroundColor: item.label === 'Total' ? '#eff6ff' : 'transparent',
                    borderRadius: item.label === 'Total' ? 4 : 0,
                  }}
                >
                  <Text style={item.label === 'Total' ? styles.textBold : {}}>
                    {item.label}
                  </Text>
                  <Text style={item.label === 'Total' ? styles.textBold : {}}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>

      {paginatedData.length > 1 &&
        paginatedData.slice(1).map((pageData, pageIndex) => (
          <Page key={pageIndex + 1} size="A4" style={styles.page}>
            <View style={styles.continuedHeader}>
              <Text style={[styles.textBold]}>
                {invoice.invoiceNumber} (Continued - Page {pageIndex + 2})
              </Text>
            </View>

            <Table style={styles.table}>
              <TH style={[styles.tableHeader, styles.textBold]}>
                <TD style={styles.td}>Description</TD>
                <TD style={styles.td}>Quantity</TD>
                <TD style={styles.td}>Unit Price</TD>
                <TD style={styles.td}>Total</TD>
              </TH>
              {pageData.map((item: InvoiceItem) => (
                <TR key={item._id}>
                  <TD style={styles.td}>
                    <View style={styles.itemDescription}>
                      <Text style={styles.textBold}>{item.description}</Text>
                      {item.details && (
                        <Text style={styles.itemDescriptionDetails}>{item.details}</Text>
                      )}
                    </View>
                  </TD>
                  <TD style={styles.td}>{item.quantity}</TD>
                  <TD style={styles.td}>${item.unitPrice.toFixed(2)}</TD>
                  <TD style={styles.td}>${item.total.toFixed(2)}</TD>
                </TR>
              ))}
            </Table>

            {pageIndex === paginatedData.length - 2 && (
              <View style={styles.totals}>
                <View style={{ minWidth: '256px' }}>
                  {invoice.totals.map((item) => (
                    <View
                      key={item._id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        padding: '6px',
                        backgroundColor: item.label === 'Total' ? '#eff6ff' : 'transparent',
                        borderRadius: item.label === 'Total' ? 4 : 0,
                      }}
                    >
                      <Text style={item.label === 'Total' ? styles.textBold : {}}>
                        {item.label}
                      </Text>
                      <Text style={item.label === 'Total' ? styles.textBold : {}}>
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              fixed
            />
          </Page>
        ))}
    </Document>
  );
};