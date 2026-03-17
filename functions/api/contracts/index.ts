// GET /api/contracts - List all contracts
export async function onRequestGet(context) {
  // Mock data - replace with real data source later (Google Drive, KV, D1, etc.)
  const contracts = [
    {
      id: 1,
      partner: "Sample Partner A",
      contractType: "Vault Services Agreement",
      category: "Vault Services",
      status: "Fully Executed",
      executionDate: "2026-01-15",
      term: "12 months",
      terminationDate: null,
      governingLaw: "Delaware",
      overview: "Sample vault services contract for demonstration.",
      terminationConditions: "30 days written notice",
      renewal: "Auto-renews annually unless terminated",
      indemnification: "Standard mutual indemnification clause",
      economicsSummary: "Fee-based revenue model",
      economicsDetail: "2% AUM fee, paid monthly",
      driveLink: "https://drive.google.com/drive/folders/example",
      form: "Blueprint Template"
    },
    {
      id: 2,
      partner: "Sample Partner B",
      contractType: "Staking Agreement",
      category: "Staking",
      status: "Draft - Concrete",
      executionDate: null,
      term: "6 months",
      terminationDate: null,
      governingLaw: "New York",
      overview: "Draft staking services agreement.",
      terminationConditions: "Immediate upon breach",
      renewal: "Subject to renegotiation",
      indemnification: "Limited indemnification",
      economicsSummary: "Performance-based fees",
      economicsDetail: "5% of staking rewards",
      driveLink: null,
      form: "Counterparty Template"
    }
  ];
  
  return new Response(JSON.stringify(contracts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
