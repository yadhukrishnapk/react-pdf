import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
  // Image,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { tableData,calculateTotalData } from "./data";
const { totalData } = calculateTotalData();
console.log("totalData:", totalData);

// import { Fragment } from "react";
import { useState } from "react";

interface TableItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  details?: string;
}

export default function Invoice2() {
  const [isLoading, setIsLoading] = useState(false);
  
  const paginateTableData = (data: TableItem[], rowsPerPage = 6): TableItem[][] => {
    const pages: TableItem[][] = [];
    for (let i = 0; i < data.length; i += rowsPerPage) {
      pages.push(data.slice(i, i + rowsPerPage));
    }
    return pages;
  };

  const paginatedData = paginateTableData(tableData);

  const getCurrentDate = () => {
    const now = new Date();
    return `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
            <Text>Invoice #INV-2024-001</Text>
            <Text style={styles.dates}>Issue Date: {getCurrentDate()}</Text>
            <Text style={styles.dates}>Due Date: June 20, 2025</Text>
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

        {/* Render the first page of table data */}
        <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD style={styles.td}>Description</TD>
            <TD style={styles.td}>Quantity</TD>
            <TD style={styles.td}>Unit Price</TD>
            <TD style={styles.td}>Total</TD>
          </TH>
          {paginatedData[0].map((item) => (
            <TR key={`${item.description}-${item.quantity}`}>
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
            <View style={{ minWidth: "256px" }}>
              {totalData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    padding: "6px",
                    backgroundColor: item.label === "Total" ? "#eff6ff" : "transparent",
                    borderRadius: item.label === "Total" ? 4 : 0,
                  }}
                >
                  <Text style={item.label === "Total" ? styles.textBold : {}}>
                    {item.label}
                  </Text>
                  <Text style={item.label === "Total" ? styles.textBold : {}}>
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
                Invoice #INV-2024-001 (Continued - Page {pageIndex + 2})
              </Text>
            </View>
            
            <Table style={styles.table}>
              <TH style={[styles.tableHeader, styles.textBold]}>
                <TD style={styles.td}>Description</TD>
                <TD style={styles.td}>Quantity</TD>
                <TD style={styles.td}>Unit Price</TD>
                <TD style={styles.td}>Total</TD>
              </TH>
              {pageData.map((item) => (
                <TR key={`${item.description}-${item.quantity}`}>
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
                <View style={{ minWidth: "256px" }}>
                  {totalData.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        padding: "6px",
                        backgroundColor: item.label === "Total" ? "#eff6ff" : "transparent",
                        borderRadius: item.label === "Total" ? 4 : 0,
                      }}
                    >
                      <Text style={item.label === "Total" ? styles.textBold : {}}>
                        {item.label}
                      </Text>
                      <Text style={item.label === "Total" ? styles.textBold : {}}>
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

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-400 py-4 px-6 text-white">
          <h2 className="text-xl font-semibold">PDF Invoice Generator</h2>
          <p className="text-sm text-blue-100">Generate professional PDF invoices with pagination support</p>
        </div>
        
        <div className="w-full h-[650px] p-4">
          <PDFViewer width="100%" height="100%" className="rounded-lg border border-gray-200 shadow-inner">
            <InvoicePDF />
          </PDFViewer>
        </div>
        
        <div className="bg-gray-50 p-6 flex justify-center border-t border-gray-200">
          <PDFDownloadLink
            document={<InvoicePDF />}
            fileName="invoice.pdf"
          >
            {/* @ts-ignore - The type definition for PDFDownloadLink children is incorrect */}
            {({ loading }) => (
              <button
                className={`flex items-center ${
                  loading || isLoading ? "bg-blue-400" : "bg-emerald-600"
                } text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-md`}
                disabled={loading}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }}
              >
                {loading || isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Invoice PDF
                  </>
                )}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>This invoice generator uses @react-pdf/renderer with pagination for professional results</p>
      </div>
    </div>
  );
}