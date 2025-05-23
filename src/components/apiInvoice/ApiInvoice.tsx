import { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from './InvoicePDF';
import { createCombinedInvoice } from './invoiceUtils';
import { RequestState } from '../../types/invoice';
import { apiGet } from '../../services/apiServices';

export default function CombinedApiInvoice() {
  const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setRequestState({ status: 'loading' });
      try {
        const data = await apiGet<{ data: any[] }>('/invoices');
        setRequestState({ status: 'success', data: data.data });
      } catch (err) {
        setRequestState({
          status: 'error',
          error: err instanceof Error ? err.message : 'An unknown error occurred',
        });
      }
    };

    fetchInvoices();
  }, []);

  const combinedInvoice = requestState.status === 'success' && requestState.data.length > 0
    ? createCombinedInvoice(requestState.data)
    : null;

  if (requestState.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center text-blue-600">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xl font-medium">Loading invoices...</span>
        </div>
      </div>
    );
  }

  if (requestState.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
          <div className="flex items-center text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xl font-medium">Error</span>
          </div>
          <p className="text-gray-700">{requestState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (requestState.status === 'success' && requestState.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Invoices Found</h2>
          <p className="text-gray-600">There are no invoices available in the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-rose-900 to-rose-400 py-4 px-6 text-white">
          <h2 className="text-xl font-semibold">Invoice from api </h2>
          <p className="text-sm text-rose-100">All invoice items merged into one PDF</p>
        </div>

        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 font-medium">API Invoice:</span>
              <span className="ml-2 text-rose-600 font-semibold">{combinedInvoice?.invoiceNumber}</span>
            </div>
            <div>
              <span className="text-gray-700">Total Items:</span>
              <span className="ml-2 text-rose-600 font-semibold">{combinedInvoice?.items.length || 0}</span>
            </div>
          </div>
        </div>

        {combinedInvoice && (
          <>
            <div className="w-full h-[650px] p-4">
              <PDFViewer width="100%" height="100%" className="rounded-lg border border-gray-200 shadow-inner">
                <InvoicePDF invoice={combinedInvoice} />
              </PDFViewer>
            </div>

            <div className="bg-gray-50 p-6 flex justify-center border-t border-gray-200">
              <PDFDownloadLink
                document={<InvoicePDF invoice={combinedInvoice} />}
                fileName={`${combinedInvoice.invoiceNumber}.pdf`}
              >
                            {/* @ts-ignore - The type definition for PDFDownloadLink children is incorrect */}

                {({ loading }) => (
                  <button
                    className={`flex items-center ${
                      loading || downloadLoading ? 'bg-rose-500' : 'bg-pink-600'
                    } text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition duration-300 font-medium shadow-md`}
                    disabled={loading}
                    onClick={() => {
                      setDownloadLoading(true);
                      setTimeout(() => setDownloadLoading(false), 1000);
                    }}
                  >
                    {loading || downloadLoading ? (
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
                        Download Combined Invoice PDF
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>This invoice generator combines all items from multiple invoices into one professional PDF with pagination support</p>
      </div>
    </div>
  );
}