import { Launch, LaunchUtils } from './Launch';

describe('Launch Entity', () => {
  const createLaunch = (overrides: Partial<Launch> = {}): Launch => {
    const defaultLaunch: Launch = {
      id: 'test-id',
      name: 'Test Mission',
      flightNumber: 1,
      dateUtc: '2023-01-01T12:00:00.000Z',
      dateLocal: '2023-01-01T08:00:00-04:00',
      success: true,
      upcoming: false,
      rocket: 'Falcon 9',
      crew: [],
      ships: [],
      payloads: [],
      launchpad: 'CCAFS SLC 40',
      details: 'Test',
      links: {},
      autoUpdate: true,
      tbd: false,
      net: false,
      window: 3600
    };
    return { ...defaultLaunch, ...overrides };
  };

  it('should handle isSuccessful', () => {
    const launch = createLaunch({ success: true });
    expect(LaunchUtils.isSuccessful(launch)).toBe(true);
  });

  it('should handle isUpcoming', () => {
    const launch = createLaunch({ upcoming: true });
    expect(LaunchUtils.isUpcoming(launch)).toBe(true);
  });

  it('should handle getFormattedDate', () => {
    const launch = createLaunch({ dateUtc: '2023-12-25T15:30:00.000Z' });
    expect(LaunchUtils.getFormattedDate(launch)).toBe('25/12/2023');
  });

  it('should handle getStatus', () => {
    const launch = createLaunch({ upcoming: true });
    expect(LaunchUtils.getStatus(launch)).toBe('Programado');
  });
});
