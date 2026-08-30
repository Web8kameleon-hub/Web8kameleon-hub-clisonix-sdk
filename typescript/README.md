# Clisonix TypeScript SDK

Official TypeScript client for the public Clisonix API. The package exposes documented developer operations while intentionally excluding infrastructure, control-plane, kernel, hardware, fabric, and security internals.

## Installation

```bash
npm install @clisonix/sdk
# or
yarn add @clisonix/sdk
# or
pnpm add @clisonix/sdk
```

## Quick Start

```typescript
import Clisonix from '@clisonix/sdk';

const clisonix = new Clisonix({
  apiKey: 'your-api-key'
});

// Check system health
const health = await clisonix.core.health();
console.log(`System status: ${health.status}`);

// Get ASI Trinity status
const asiStatus = await clisonix.asi.getStatus();
console.log(`ASI available: ${asiStatus.available}`);
```

## API Modules

### Core API
System health and status endpoints.

```typescript
// Health check
const health = await clisonix.core.health();

// Detailed status
const status = await clisonix.core.status();

// Ping
const ping = await clisonix.core.ping();
```

### Brain API
Neural harmonic processing and analysis.

```typescript
// Analyze harmonics
const analysis = await clisonix.brain.analyzeHarmonics({
  frequencies: [8, 10, 12, 14],
  amplitudes: [0.5, 0.8, 0.6, 0.4]
});

// Get brain sync metrics
const sync = await clisonix.brain.getSync();

// Cortex analysis
const cortex = await clisonix.brain.analyzeCortex({
  pattern_data: [0.1, 0.5, 0.3, 0.8, 0.2],
  analysis_type: 'deep'
});

// Ask AI assistant
const response = await clisonix.brain.ask(
  "What does increased alpha wave activity indicate?"
);
```

### EEG API
EEG data collection and processing.

```typescript
// Start recording session
const session = await clisonix.eeg.startSession({
  channels: 8,
  sample_rate: 256
});

// Get session data
const data = await clisonix.eeg.getSessionData(session.session_id);

// Analyze frequencies
const frequencies = await clisonix.eeg.analyzeFrequencies(session.session_id);

// Stop session
await clisonix.eeg.stopSession(session.session_id);
```

### ASI API
Sanitized, high-level ASI availability. Component metrics and control-plane operations are intentionally not part of the public SDK.

```typescript
// Get ASI status
const status = await clisonix.asi.getStatus();

// Get high-level health without protected component details
const health = await clisonix.asi.getHealth();
```

### Billing API
Payment and subscription management.

```typescript
// Get available plans
const plans = await clisonix.billing.getPlans();

// Get current subscription
const subscription = await clisonix.billing.getSubscription();

// Create checkout session
const checkout = await clisonix.billing.createCheckout('pro');

// Get usage stats
const usage = await clisonix.billing.getUsage();
```

### Excel API
User-facing report generation operations.

```typescript
// Generate Excel report
const report = await clisonix.excel.generateReport({
  report_type: 'monthly_summary',
  format: 'xlsx'
});

// Get templates
const templates = await clisonix.excel.getTemplates();
```

## Configuration

```typescript
const clisonix = new Clisonix({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.clisonix.com', // Optional, defaults to production
  excelBaseUrl: 'https://excel.clisonix.com', // Optional
  timeout: 30000, // Optional, request timeout in ms
  retries: 3 // Optional, number of retry attempts
});
```

## Error Handling

```typescript
import { Clisonix, ClisonixError } from '@clisonix/sdk';

try {
  const health = await clisonix.core.health();
} catch (error) {
  if (error instanceof ClisonixError) {
    console.error(`API Error: ${error.message}`);
    console.error(`Code: ${error.code}`);
    console.error(`Status: ${error.statusCode}`);
  }
}
```

## TypeScript Support

Full TypeScript support with all types exported:

```typescript
import {
  Clisonix,
  HealthResponse,
  ASIStatus,
  BrainSyncResult,
  EEGSession,
  BillingPlan
} from '@clisonix/sdk';
```

## Production Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| Main API | https://api.clisonix.com | Core, Brain, EEG, ASI, Billing |
| Excel | https://excel.clisonix.com | Excel Reports |
| Frontend | https://clisonix.com | Web Dashboard |

## Public Security Boundary

This SDK publishes how developers use Clisonix, not the protected mechanisms that operate it. It does not expose:

- kernel, OS-CLX runtime, scheduler, or memory internals;
- hardware or bare-metal orchestration;
- Sovereign Fabric topology or control paths;
- container, host, peer, or node inventory;
- component-level ALBA, ALBI, JONA, NIN, MALI, or NodeDB metrics;
- security primitives or privileged maintenance operations.

See the repository-level [Clisonix Public Interface and Protected Core Policy](../PUBLICATION_POLICY.md).

## License

MIT © Clisonix Cloud
