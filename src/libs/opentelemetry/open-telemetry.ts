import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions'

import { traceExporter } from './tracer'
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const otelSDK = new NodeSDK({
  traceExporter,
  instrumentations: [new NestInstrumentation()],
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'study-nest',
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  textMapPropagator: new CompositePropagator({
    propagators: [
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
})

export default otelSDK
