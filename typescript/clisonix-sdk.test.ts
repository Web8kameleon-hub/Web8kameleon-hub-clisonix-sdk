import { afterEach, describe, expect, it, vi } from 'vitest';

import Clisonix from './clisonix-sdk';

describe('Clisonix public SDK boundary', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not expose protected infrastructure or control-plane modules', () => {
    const client = new Clisonix({ apiKey: 'test-key' });

    expect(client).not.toHaveProperty('reporting');
    expect(client.asi).not.toHaveProperty('triggerSync');
    expect(client.asi).not.toHaveProperty('getALBAMetrics');
    expect(client.excel).not.toHaveProperty('regenerate');
  });

  it('returns a sanitized health response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        service: 'clisonix-api',
        status: 'healthy',
        version: '1.0.0',
        timestamp: '2026-08-30T00:00:00Z',
        environment: 'production',
        hostname: 'private-host',
        instance_id: 'private-instance',
        system: { cpu_percent: 42 }
      })
    }));

    const client = new Clisonix({ apiKey: 'test-key', retries: 1 });
    const health = await client.core.health();

    expect(health).toEqual({
      service: 'clisonix-api',
      status: 'healthy',
      version: '1.0.0',
      timestamp: '2026-08-30T00:00:00Z',
      environment: 'production'
    });
    expect(health).not.toHaveProperty('hostname');
    expect(health).not.toHaveProperty('instance_id');
    expect(health).not.toHaveProperty('system');
  });
});
