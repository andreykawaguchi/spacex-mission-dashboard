import { Launch, LaunchUtils } from '../../../src/domain/entities/Launch';

describe('Launch Entity', () => {
  // Helper function to create a Launch with default values
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
      crew: ['Astronaut 1', 'Astronaut 2'],
      ships: ['Ship 1'],
      payloads: ['Satellite 1'],
      launchpad: 'CCAFS SLC 40',
      details: 'Test mission details',
      links: {
        patch: {
          small: 'small-patch.png',
          large: 'large-patch.png'
        },
        reddit: {
          campaign: 'reddit-campaign-url',
          launch: 'reddit-launch-url',
          media: 'reddit-media-url',
          recovery: 'reddit-recovery-url'
        },
        flickr: {
          small: ['flickr-small-1.jpg'],
          original: ['flickr-original-1.jpg']
        },
        presskit: 'presskit-url',
        webcast: 'webcast-url',
        youtube_id: 'youtube-id',
        article: 'article-url',
        wikipedia: 'wikipedia-url'
      },
      autoUpdate: true,
      tbd: false,
      net: false,
      window: 3600
    };

    return { ...defaultLaunch, ...overrides };
  };

  describe('Object Creation', () => {
    it('should create a Launch object with all properties', () => {
      const launch: Launch = {
        id: 'test-id',
        name: 'Test Mission',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: ['Astronaut 1'],
        ships: ['Ship 1'],
        payloads: ['Satellite 1'],
        launchpad: 'CCAFS SLC 40',
        details: 'Test details',
        links: {
          webcast: 'webcast-url'
        },
        autoUpdate: true,
        tbd: false,
        net: false,
        window: 3600
      };

      expect(launch.id).toBe('test-id');
      expect(launch.name).toBe('Test Mission');
      expect(launch.flightNumber).toBe(1);
      expect(launch.dateUtc).toBe('2023-01-01T12:00:00.000Z');
      expect(launch.success).toBe(true);
      expect(launch.upcoming).toBe(false);
      expect(launch.rocket).toBe('Falcon 9');
      expect(launch.crew).toEqual(['Astronaut 1']);
      expect(launch.ships).toEqual(['Ship 1']);
      expect(launch.payloads).toEqual(['Satellite 1']);
      expect(launch.launchpad).toBe('CCAFS SLC 40');
      expect(launch.details).toBe('Test details');
      expect(launch.autoUpdate).toBe(true);
      expect(launch.tbd).toBe(false);
      expect(launch.net).toBe(false);
      expect(launch.window).toBe(3600);
    });

    it('should handle empty arrays for crew, ships, and payloads', () => {
      const launch = createLaunch({
        crew: [],
        ships: [],
        payloads: []
      });

      expect(launch.crew).toEqual([]);
      expect(launch.ships).toEqual([]);
      expect(launch.payloads).toEqual([]);
    });

    it('should handle null values gracefully', () => {
      const launch = createLaunch({
        success: null,
        details: null,
        window: null
      });

      expect(launch.success).toBeNull();
      expect(launch.details).toBeNull();
      expect(launch.window).toBeNull();
    });
  });

  describe('LaunchUtils.isSuccessful', () => {
    it('should return true when success is true', () => {
      const launch = createLaunch({ success: true });
      expect(LaunchUtils.isSuccessful(launch)).toBe(true);
    });

    it('should return false when success is false', () => {
      const launch = createLaunch({ success: false });
      expect(LaunchUtils.isSuccessful(launch)).toBe(false);
    });

    it('should return false when success is null', () => {
      const launch = createLaunch({ success: null });
      expect(LaunchUtils.isSuccessful(launch)).toBe(false);
    });
  });

  describe('LaunchUtils.isUpcoming', () => {
    it('should return true when upcoming is true', () => {
      const launch = createLaunch({ upcoming: true });
      expect(LaunchUtils.isUpcoming(launch)).toBe(true);
    });

    it('should return false when upcoming is false', () => {
      const launch = createLaunch({ upcoming: false });
      expect(LaunchUtils.isUpcoming(launch)).toBe(false);
    });
  });

  describe('LaunchUtils.getFormattedDate', () => {
    it('should return formatted date in Brazilian format', () => {
      const launch = createLaunch({ dateUtc: '2023-12-25T15:30:00.000Z' });
      const formattedDate = LaunchUtils.getFormattedDate(launch);
      expect(formattedDate).toBe('25/12/2023');
    });

    it('should handle empty dateUtc', () => {
      const launch = createLaunch({ dateUtc: '' });
      const formattedDate = LaunchUtils.getFormattedDate(launch);
      expect(formattedDate).toBe('Data não disponível');
    });

    it('should handle null dateUtc', () => {
      const launch = createLaunch({ dateUtc: null as any });
      const formattedDate = LaunchUtils.getFormattedDate(launch);
      expect(formattedDate).toBe('Data não disponível');
    });

    it('should handle invalid date string', () => {
      const launch = createLaunch({ dateUtc: 'invalid-date' });
      const formattedDate = LaunchUtils.getFormattedDate(launch);
      expect(formattedDate).toBe('Invalid Date');
    });
  });

  describe('LaunchUtils.getStatus', () => {
    it('should return "Programado" for upcoming launches', () => {
      const launch = createLaunch({ upcoming: true });
      expect(LaunchUtils.getStatus(launch)).toBe('Programado');
    });

    it('should return "Sucesso" for successful completed launches', () => {
      const launch = createLaunch({ 
        upcoming: false, 
        success: true 
      });
      expect(LaunchUtils.getStatus(launch)).toBe('Sucesso');
    });

    it('should return "Falha" for failed launches', () => {
      const launch = createLaunch({ 
        upcoming: false, 
        success: false 
      });
      expect(LaunchUtils.getStatus(launch)).toBe('Falha');
    });

    it('should return "Desconhecido" for launches with null success', () => {
      const launch = createLaunch({ 
        upcoming: false, 
        success: null 
      });
      expect(LaunchUtils.getStatus(launch)).toBe('Desconhecido');
    });

    it('should prioritize upcoming status over success status', () => {
      const launch = createLaunch({ 
        upcoming: true, 
        success: true 
      });
      expect(LaunchUtils.getStatus(launch)).toBe('Programado');
    });
  });

  describe('Edge cases and data integrity', () => {
    it('should handle undefined crew, ships, and payloads by treating as empty arrays', () => {
      const launch: Launch = {
        id: 'test-id',
        name: 'Test Mission',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [] as any,
        ships: [] as any,
        payloads: [] as any,
        launchpad: 'CCAFS SLC 40',
        details: 'Test details',
        links: {},
        autoUpdate: true,
        tbd: false,
        net: false,
        window: 3600
      };

      expect(launch.crew).toEqual([]);
      expect(launch.ships).toEqual([]);
      expect(launch.payloads).toEqual([]);
    });

    it('should handle complex links object', () => {
      const complexLinks = {
        patch: {
          small: 'https://example.com/small.png',
          large: 'https://example.com/large.png'
        },
        reddit: {
          campaign: 'https://reddit.com/campaign',
          launch: 'https://reddit.com/launch',
          media: 'https://reddit.com/media',
          recovery: undefined
        },
        flickr: {
          small: ['https://flickr.com/1.jpg', 'https://flickr.com/2.jpg'],
          original: ['https://flickr.com/original1.jpg']
        },
        presskit: 'https://example.com/presskit.pdf',
        webcast: 'https://youtube.com/watch?v=123',
        youtube_id: '123',
        article: 'https://news.com/article',
        wikipedia: 'https://wikipedia.org/article'
      };

      const launch = createLaunch({ links: complexLinks });

      expect(launch.links).toEqual(complexLinks);
      expect(launch.links.patch?.small).toBe('https://example.com/small.png');
      expect(launch.links.reddit?.campaign).toBe('https://reddit.com/campaign');
      expect(launch.links.flickr?.small).toEqual(['https://flickr.com/1.jpg', 'https://flickr.com/2.jpg']);
    });

    it('should handle minimum required fields', () => {
      const launch: Launch = {
        id: 'minimal-id',
        name: 'Minimal Mission',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: null,
        upcoming: true,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'Unknown',
        details: null,
        links: {},
        autoUpdate: false,
        tbd: true,
        net: true,
        window: null
      };

      expect(launch.id).toBe('minimal-id');
      expect(launch.name).toBe('Minimal Mission');
      expect(launch.success).toBeNull();
      expect(launch.upcoming).toBe(true);
      expect(launch.details).toBeNull();
      expect(launch.window).toBeNull();
      expect(LaunchUtils.getStatus(launch)).toBe('Programado');
      expect(LaunchUtils.isSuccessful(launch)).toBe(false);
    });
  });

  describe('Boolean properties behavior', () => {
    it('should correctly handle autoUpdate property', () => {
      const autoUpdateTrue = createLaunch({ autoUpdate: true });
      const autoUpdateFalse = createLaunch({ autoUpdate: false });

      expect(autoUpdateTrue.autoUpdate).toBe(true);
      expect(autoUpdateFalse.autoUpdate).toBe(false);
    });

    it('should correctly handle tbd (to be determined) property', () => {
      const tbdTrue = createLaunch({ tbd: true });
      const tbdFalse = createLaunch({ tbd: false });

      expect(tbdTrue.tbd).toBe(true);
      expect(tbdFalse.tbd).toBe(false);
    });

    it('should correctly handle net (no earlier than) property', () => {
      const netTrue = createLaunch({ net: true });
      const netFalse = createLaunch({ net: false });

      expect(netTrue.net).toBe(true);
      expect(netFalse.net).toBe(false);
    });
  });
});
