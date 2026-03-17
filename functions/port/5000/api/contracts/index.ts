// Proxy for broken React build - just forward to real contracts endpoint
export async function onRequestGet(context) {
  // Import the real handler
  const realHandler = await import('../../../api/contracts/index.ts');
  return realHandler.onRequestGet(context);
}
