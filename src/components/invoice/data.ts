export const tableData = [
  {
    description: "Web Design Service",
    quantity: 1,
    unitPrice: 1500.0,
    total: 1500.0,
  },
  {
    description: "Hosting Setup",
    quantity: 2,
    unitPrice: 250.0,
    total: 250.0,
  },
  {
    description: "Domain Registration",
    quantity: 1,
    unitPrice: 50.0,
    total: 50.0,
  },
  {
    description: "SSL Certificate",
    quantity: 1,
    unitPrice: 100.0,
    total: 100.0,
  },
  {
    description: "SEO Optimization",
    quantity: 1,
    unitPrice: 200.0,
    total: 200.0,
  },
  {
    description: "Content Creation",
    quantity: 8,
    unitPrice: 300.0,
    total: 300.0,
  },
  {
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  },
  {
    description: "Technical Support",
    quantity: 1,
    unitPrice: 100.0,
    total: 100.0,
  },{
    description: "Website Backup",
    quantity: 1,
    unitPrice: 50.0,
    total: 50.0,
  },
  {
    description: "Website Security",
    quantity: 6,
    unitPrice: 100.0,
    total: 100.0,
  },{
    description: "Website Optimization",
    quantity: 1,
    unitPrice: 200.0,
    total: 200.0,
  },{
    description: "Website Migration",
    quantity: 1,
    unitPrice: 500.0,
    total: 500.0,
  },{
    description: "Website Customization",
    quantity: 1,
    unitPrice: 300.0,
    total: 300.0,
  },
  {
    description: "Website Hosting",
    quantity: 1,
    unitPrice: 100.0,
    total: 100.0,
  },
  {
    description: "Website Analytics",
    quantity: 1,
    unitPrice: 50.0,
    total: 50.0,
  },{
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  },{
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  },{
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  },{
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  },{
    description: "Website Maintenance",
    quantity: 12,
    unitPrice: 150.0,
    total: 250.0,
  },{
    description: "Website Maintenance",
    quantity: 1,
    unitPrice: 150.0,
    total: 150.0,
  }
];

// export const totalData = [
//   {
//     label: "Subtotal",
//     value: "$1,750.00",
//   },
//   {
//     label: "Tax (10%)",
//     value: "$175.00",
//   },
//   {
//     label: "Total",
//     value: "$1,925.00",
//   },
// ];

const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

// Function to generate invoice totals
export const calculateTotalData = () => {
  const tableWithTotals = tableData.map((item) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));

  const subtotal = tableWithTotals.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return {
    tableData: tableWithTotals,
    totalData: [
      { label: "Subtotal", value: formatCurrency(subtotal) },
      { label: "Tax (10%)", value: formatCurrency(tax) },
      { label: "Total", value: formatCurrency(total) },
    ],
  };
}
