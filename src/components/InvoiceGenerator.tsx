import { useState } from "react";
import Invoice from "./invoice";
import Invoice2 from "./invoice/invoice";
import ApiInvoice from "./apiInvoice/ApiInvoice";

export default function InvoiceGenerator() {
  const [activeTab, setActiveTab] = useState<"html2canvas" | "reactpdf" | "apipdf">("reactpdf");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "html2canvas"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("html2canvas")}
          >
            HTML2Canvas Solution
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "reactpdf"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("reactpdf")}
          >
            React-PDF Solution
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "apipdf"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("apipdf")}
          >
            API-PDF 
          </button>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-600 bg-blue-50 rounded-lg p-4 mb-6">
            <strong className="font-medium text-blue-700">About this demo:</strong> This application showcases two different approaches to generating PDF invoices:
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                <strong>HTML2Canvas:</strong> Converts HTML content to a canvas then to PDF (good for pixel-perfect HTML designs)
              </li>
              <li>
                <strong>React-PDF:</strong> Builds PDFs directly with specialized components (better for multi-page documents)
              </li>
              <li>
                <strong>API-PDF:</strong> Utilizes an API to generate PDFs (best for large-scale documents)
              </li>
            </ul>
          </div>

          {activeTab === "html2canvas" && <Invoice />}
          {activeTab === "reactpdf" && <Invoice2 />}
          {activeTab === "apipdf" && <ApiInvoice />}
        </div>
      </div>

      {/* <div className="text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Invoice Generator Demo | All designs are for demonstration purposes only</p>
      </div> */}
    </div>
  );
}