import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { FaDownload, FaFileInvoiceDollar } from "react-icons/fa";

export default function Invoice() {
  const printRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownloadPdf = async () => {
    setIsLoading(true);
    const element = printRef.current;
    if (!element) {
      setIsLoading(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice-2024-001.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-3xl border border-gray-100">
        {/* Invoice Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <FaFileInvoiceDollar className="mr-2" /> Professional Invoice
            </h1>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              #INV-2024-001
            </span>
          </div>
        </div>
        
        {/* Printable Content */}
        <div ref={printRef} className="p-6 md:p-8 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
              <p className="text-sm text-gray-500 mt-1">Issue Date: May 20, 2025</p>
              <p className="text-sm text-gray-500">Due Date: June 20, 2025</p>
            </div>
            <div className="text-right">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h2 className="font-semibold text-gray-800">Company Name</h2>
                <p className="text-sm text-gray-600">
                  123 Business Street
                  <br />
                  City, State 12345
                  <br />
                  contact@company.com
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Bill To:</h3>
            <p className="text-gray-700">
              Client Name
              <br />
              Client Address
              <br />
              City, State ZIP
              <br />
              client@example.com
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700">Description</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold text-gray-700">Quantity</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold text-gray-700">Unit Price</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3">
                    <span className="font-medium">Web Design Service</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Complete website design including responsive layouts
                    </p>
                  </td>
                  <td className="border border-gray-200 p-3 text-right">1</td>
                  <td className="border border-gray-200 p-3 text-right">$1,500.00</td>
                  <td className="border border-gray-200 p-3 text-right font-medium">$1,500.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3">
                    <span className="font-medium">Hosting Setup</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Domain registration and hosting configuration
                    </p>
                  </td>
                  <td className="border border-gray-200 p-3 text-right">1</td>
                  <td className="border border-gray-200 p-3 text-right">$250.00</td>
                  <td className="border border-gray-200 p-3 text-right font-medium">$250.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-64 md:w-72">
              <div className="flex justify-between p-2 mb-1 border-b border-gray-100">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">$1,750.00</span>
              </div>
              <div className="flex justify-between p-2 mb-1 border-b border-gray-100">
                <span className="text-gray-600">Tax (10%):</span>
                <span className="font-medium">$175.00</span>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-lg mt-2">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-blue-700">$1,925.00</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              <span className="font-medium text-gray-700">Payment Terms:</span> Net 30 days
            </p>
            <p className="text-gray-500 text-sm mt-1">
              <span className="font-medium text-gray-700">Payment Methods:</span> Bank Transfer, Credit Card
            </p>
            <p className="text-center mt-6 text-sm text-gray-500">
              Thank you for your business!
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-center border-t border-gray-100">
          <button
            onClick={handleDownloadPdf}
            disabled={isLoading}
            className="flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-sm hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaDownload className="mr-2" /> Download PDF
              </>
            )}
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mt-4">
        This is a sample invoice for demonstration purposes only.
      </p>
    </div>
  );
}