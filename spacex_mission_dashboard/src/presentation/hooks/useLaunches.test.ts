import { Launch, LaunchUtils } from '../../domain/entities/Launch';

describe('Launch Tests', () => {
  it('works', () => {
    const launch: Launch = {
      id: '1',
      name: 'Test',
      flightNumber: 1,
      dateUtc: '2023-01-01T00:00:00Z',
      dateLocal: '2023-01-01T00:00:00Z',
      success: true,
      upcoming: false,
      rocket: 'Falcon 9',
      crew: [],
      ships: [],
      payloads: [],
      launchpad: 'Test',
      details: null,
      links: {},
      autoUpdate: false,
      tbd: false,
      net: false,
      window: null
    };
    expect(LaunchUtils.isSuccessful(launch)).toBe(true);
  });
});
