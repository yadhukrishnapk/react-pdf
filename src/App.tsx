import Header from "./components/Header/Header";
import InvoiceGenerator from "./components/InvoiceGenerator";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />  
      <div className="pt-24">
        <InvoiceGenerator />
      </div>
    </div>
  );
}

export default App;