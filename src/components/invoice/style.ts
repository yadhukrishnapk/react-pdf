import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    padding: "40px 50px",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    letterSpacing: 0.5,
    color: "#1e40af", // blue-800
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  billTo: {
    marginBottom: 12,
    fontSize: 14,
    color: "#1f2937", // gray-800
  },
  table: {
    width: "100%",
    borderColor: "#e5e7eb", // gray-200
    margin: "24px 0",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6", // gray-100
    borderBottom: "1px solid #e5e7eb",
    fontSize: 12,
    color: "#374151", // gray-700
  },
  td: {
    padding: 10,
    fontSize: 11,
    borderBottom: "1px solid #f3f4f6", // gray-100
  },
  totals: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 20,
  },
  totalRow: {
    backgroundColor: "#eff6ff", // blue-50
    padding: 8,
    borderRadius: 4,
  },
  invoiceMetadata: {
    marginBottom: 10,
    fontSize: 10,
    color: "#6b7280", // gray-500
  },
  headerCompanyInfo: {
    padding: 12,
    backgroundColor: "#f9fafb", // gray-50
    borderRadius: 4,
    fontSize: 10,
  },
  clientInfo: {
    padding: 12,
    backgroundColor: "#f9fafb", // gray-50
    borderRadius: 4,
    marginBottom: 24,
    maxWidth: "60%",
  },
  footer: {
    marginTop: 40,
    borderTop: "1px solid #f3f4f6",
    paddingTop: 20,
    fontSize: 10,
    color: "#6b7280", // gray-500
    textAlign: "center",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 10,
    textAlign: "center",
    color: "#9ca3af", // gray-400
  },
  continuedHeader: {
    backgroundColor: "#f9fafb", // gray-50
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  itemDescription: {
    flexDirection: "column",
  },
  itemDescriptionDetails: {
    marginTop: 4,
    fontSize: 9,
    color: "#6b7280", // gray-500
  },
  dates: {
    marginTop: 5, 
    fontSize: 10,
    color: "#6b7280", // gray-500
  },
});