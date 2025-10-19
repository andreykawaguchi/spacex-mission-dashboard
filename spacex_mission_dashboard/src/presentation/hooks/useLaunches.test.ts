import { Launch } from '../../domain/entities/Launch';
import { CustomMission } from '../../store/slices/launchesSlice';

describe('Launch Entity Business Logic Tests', () => {
  // Helper to create launch with minimal data
  const createTestLaunch = (overrides = {}) => {
    return new Launch({
      id: 'test-id',
      name: 'Test Launch',
      flightNumber: 1,
      dateUtc: '2023-01-01T12:00:00.000Z',
      dateLocal: '2023-01-01T08:00:00-04:00',
      success: true,
      upcoming: false,
      rocket: 'Falcon 9',
      crew: [],
      ships: [],
      payloads: [],
      launchpad: 'Test Pad',
      details: 'Test details',
      links: {},
      autoUpdate: false,
      tbd: false,
      net: false,
      window: null,
      ...overrides
    });
  };

  describe('Launch status determination', () => {
    it('should identify successful launches correctly', () => {
      const successfulLaunch = createTestLaunch({ success: true, upcoming: false });
      expect(successfulLaunch.isSuccessful()).toBe(true);
      expect(successfulLaunch.getStatus()).toBe('Sucesso');
    });

    it('should identify failed launches correctly', () => {
      const failedLaunch = createTestLaunch({ success: false, upcoming: false });
      expect(failedLaunch.isSuccessful()).toBe(false);
      expect(failedLaunch.getStatus()).toBe('Falha');
    });

    it('should identify upcoming launches correctly', () => {
      const upcomingLaunch = createTestLaunch({ upcoming: true, success: null });
      expect(upcomingLaunch.isUpcoming()).toBe(true);
      expect(upcomingLaunch.getStatus()).toBe('Programado');
    });

    it('should handle unknown status launches', () => {
      const unknownLaunch = createTestLaunch({ success: null, upcoming: false });
      expect(unknownLaunch.isSuccessful()).toBe(false);
      expect(unknownLaunch.getStatus()).toBe('Desconhecido');
    });

    it('should prioritize upcoming status over success status', () => {
      const upcomingSuccessfulLaunch = createTestLaunch({ upcoming: true, success: true });
      expect(upcomingSuccessfulLaunch.getStatus()).toBe('Programado');
    });
  });

  describe('Date formatting', () => {
    it('should format valid dates correctly', () => {
      const launch = createTestLaunch({ dateUtc: '2023-12-25T15:30:00.000Z' });
      expect(launch.getFormattedDate()).toBe('25/12/2023');
    });

    it('should handle empty date strings', () => {
      const launch = createTestLaunch({ dateUtc: '' });
      expect(launch.getFormattedDate()).toBe('Data não disponível');
    });

    it('should handle null dates', () => {
      const launch = createTestLaunch({ dateUtc: null });
      expect(launch.getFormattedDate()).toBe('Data não disponível');
    });

    it('should handle undefined dates', () => {
      const launch = createTestLaunch({ dateUtc: undefined });
      expect(launch.getFormattedDate()).toBe('Data não disponível');
    });
  });

  describe('Array properties handling', () => {
    it('should handle crew arrays correctly', () => {
      const crewedLaunch = createTestLaunch({ 
        crew: ['Commander', 'Pilot', 'Mission Specialist'] 
      });
      expect(crewedLaunch.crew).toHaveLength(3);
      expect(crewedLaunch.crew).toContain('Commander');
    });

    it('should handle empty crew arrays', () => {
      const uncrewedLaunch = createTestLaunch({ crew: [] });
      expect(uncrewedLaunch.crew).toHaveLength(0);
    });

    it('should handle ships arrays correctly', () => {
      const launchWithShips = createTestLaunch({ 
        ships: ['Recovery Ship 1', 'Recovery Ship 2'] 
      });
      expect(launchWithShips.ships).toHaveLength(2);
    });

    it('should handle payloads arrays correctly', () => {
      const launchWithPayloads = createTestLaunch({ 
        payloads: ['Satellite 1', 'Satellite 2', 'CubeSat'] 
      });
      expect(launchWithPayloads.payloads).toHaveLength(3);
    });
  });

  describe('Technical properties', () => {
    it('should handle window values correctly', () => {
      const launchWithWindow = createTestLaunch({ window: 3600 });
      expect(launchWithWindow.window).toBe(3600);
    });

    it('should handle null window values', () => {
      const launchWithoutWindow = createTestLaunch({ window: null });
      expect(launchWithoutWindow.window).toBeNull();
    });

    it('should handle boolean flags correctly', () => {
      const launch = createTestLaunch({
        autoUpdate: true,
        tbd: false,
        net: true
      });
      expect(launch.autoUpdate).toBe(true);
      expect(launch.tbd).toBe(false);
      expect(launch.net).toBe(true);
    });
  });

  describe('Links object handling', () => {
    it('should handle complex links objects', () => {
      const launchWithLinks = createTestLaunch({
        links: {
          webcast: 'https://youtube.com/watch?v=123',
          article: 'https://news.com/article',
          wikipedia: 'https://wikipedia.org/page',
          reddit: {
            campaign: 'https://reddit.com/campaign'
          },
          patch: {
            small: 'small.png',
            large: 'large.png'
          }
        }
      });

      expect(launchWithLinks.links.webcast).toBe('https://youtube.com/watch?v=123');
      expect(launchWithLinks.links.reddit?.campaign).toBe('https://reddit.com/campaign');
      expect(launchWithLinks.links.patch?.small).toBe('small.png');
    });

    it('should handle empty links objects', () => {
      const launchWithoutLinks = createTestLaunch({ links: {} });
      expect(launchWithoutLinks.links).toEqual({});
    });
  });
});

describe('CustomMission Business Logic Tests', () => {
  const createTestCustomMission = (overrides = {}): CustomMission => {
    return {
      id: 'custom-test',
      name: 'Custom Test Mission',
      upcoming: true,
      dateUtc: '2024-01-01T12:00:00.000Z',
      rocket: 'Custom Rocket',
      details: 'Custom mission details',
      custom: true,
      ...overrides
    };
  };

  describe('CustomMission properties', () => {
    it('should have all required properties', () => {
      const mission = createTestCustomMission();
      expect(mission.id).toBe('custom-test');
      expect(mission.name).toBe('Custom Test Mission');
      expect(mission.upcoming).toBe(true);
      expect(mission.custom).toBe(true);
    });

    it('should handle upcoming and completed states', () => {
      const upcomingMission = createTestCustomMission({ upcoming: true });
      const completedMission = createTestCustomMission({ upcoming: false });

      expect(upcomingMission.upcoming).toBe(true);
      expect(completedMission.upcoming).toBe(false);
    });

    it('should handle optional details', () => {
      const missionWithDetails = createTestCustomMission({ details: 'Detailed description' });
      const missionWithoutDetails = createTestCustomMission({ details: undefined });

      expect(missionWithDetails.details).toBe('Detailed description');
      expect(missionWithoutDetails.details).toBeUndefined();
    });
  });

  describe('CustomMission validation', () => {
    it('should maintain custom flag', () => {
      const mission = createTestCustomMission();
      expect(mission.custom).toBe(true);
    });

    it('should handle different rocket types', () => {
      const mission1 = createTestCustomMission({ rocket: 'Falcon Heavy' });
      const mission2 = createTestCustomMission({ rocket: 'Starship' });

      expect(mission1.rocket).toBe('Falcon Heavy');
      expect(mission2.rocket).toBe('Starship');
    });

    it('should handle various date formats', () => {
      const mission = createTestCustomMission({ dateUtc: '2025-06-15T10:30:00.000Z' });
      expect(mission.dateUtc).toBe('2025-06-15T10:30:00.000Z');
    });
  });
});

describe('Launch vs CustomMission Comparison', () => {
  const launch = new Launch({
    id: 'launch-1',
    name: 'Real Launch',
    flightNumber: 100,
    dateUtc: '2023-01-01T12:00:00.000Z',
    dateLocal: '2023-01-01T08:00:00-04:00',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    crew: ['Astronaut 1'],
    ships: ['Ship 1'],
    payloads: ['Payload 1'],
    launchpad: 'Pad 1',
    details: 'Launch details',
    links: { webcast: 'https://youtube.com/watch' },
    autoUpdate: true,
    tbd: false,
    net: false,
    window: 3600
  });

  const customMission: CustomMission = {
    id: 'custom-1',
    name: 'Custom Mission',
    upcoming: true,
    dateUtc: '2024-01-01T12:00:00.000Z',
    rocket: 'Custom Rocket',
    details: 'Custom details',
    custom: true
  };

  describe('Type differentiation', () => {
    it('should identify Launch vs CustomMission correctly', () => {
      const isLaunchInstance = launch instanceof Launch;
      const hasFlightNumber = 'flightNumber' in launch;
      const hasCustomFlag = 'custom' in customMission && customMission.custom;

      expect(isLaunchInstance).toBe(true);
      expect(hasFlightNumber).toBe(true);
      expect(hasCustomFlag).toBe(true);
    });

    it('should have different property sets', () => {
      // Launch-specific properties
      expect('flightNumber' in launch).toBe(true);
      expect('success' in launch).toBe(true);
      expect('launchpad' in launch).toBe(true);
      expect('crew' in launch).toBe(true);

      // CustomMission-specific properties
      expect('flightNumber' in customMission).toBe(false);
      expect('success' in customMission).toBe(false);
      expect('launchpad' in customMission).toBe(false);
      expect('custom' in customMission).toBe(true);
    });

    it('should share common properties', () => {
      // Shared properties
      expect('id' in launch && 'id' in customMission).toBe(true);
      expect('name' in launch && 'name' in customMission).toBe(true);
      expect('dateUtc' in launch && 'dateUtc' in customMission).toBe(true);
      expect('rocket' in launch && 'rocket' in customMission).toBe(true);
      expect('details' in launch && 'details' in customMission).toBe(true);
    });
  });
});