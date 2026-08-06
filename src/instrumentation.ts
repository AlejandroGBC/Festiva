
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("node:dns");
    dns.setDefaultResultOrder("ipv4first");

    const { Agent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new Agent({ connect: { timeout: 30_000 } }));

    console.log("[instrumentation] DNS ipv4first + connect timeout 30s configurados globalmente");
  }
}