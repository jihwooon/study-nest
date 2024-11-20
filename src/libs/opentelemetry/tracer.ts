import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

const exporterOptions = {
  url: 'http://jaeger:4317',
  concurrencyLimit: 10,
}

export const traceExporter = new OTLPTraceExporter(exporterOptions)
