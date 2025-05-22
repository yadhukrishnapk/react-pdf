import { StyleSheet } from '@react-pdf/renderer';

export const stylesapi = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerCompanyInfo: {
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    marginTop: 5,
  },
  clientInfo: {
    marginBottom: 20,
  },
  billTo: {
    marginBottom: 5,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  td: {
    padding: 8,
  },
  itemDescription: {
    flexDirection: 'column',
  },
  itemDescriptionDetails: {
    fontSize: 10,
    color: '#666',
  },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 80,
    fontSize: 10,
  },
  continuedHeader: {
    marginBottom: 20,
  },
});