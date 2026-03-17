// GET /api/contracts/:id - Get specific contract
export async function onRequestGet(context) {
  const { params } = context;
  const id = parseInt(params.id, 10);
  
  // Mock data - match IDs from index.ts
  const contracts = {
    1: {
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
    2: {
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
  };
  
  const contract = contracts[id];
  
  if (!contract) {
    return new Response(JSON.stringify({ error: 'Contract not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(contract), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// PATCH /api/contracts/:id - Update contract
export async function onRequestPatch(context) {
  const { request, params } = context;
  const id = parseInt(params.id, 10);
  
  try {
    const updates = await request.json();
    
    // In a real implementation, you'd save to a database (KV, D1, Supabase, etc.)
    // For now, just return success
    
    return new Response(JSON.stringify({ ok: true, id, updates }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
