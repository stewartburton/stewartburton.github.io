// These modules are loaded by the browser from the existing Mermaid CDN URL.
declare module 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs' {
  const mermaid: {
    initialize(config: Record<string, unknown>): void;
    run(config: { querySelector: string }): Promise<void>;
  };
  export default mermaid;
}
