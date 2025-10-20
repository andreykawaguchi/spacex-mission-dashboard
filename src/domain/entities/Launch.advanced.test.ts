import { Launch, LaunchUtils } from './Launch';

describe('Launch Entity - Advanced Scenarios', () => {
  const createMockLaunch = (overrides: Partial<Launch> = {}): Launch => ({
    id: '1',
    name: 'Test Launch',
    flightNumber: 1,
    dateUtc: '2023-06-04T14:30:00.000Z',
    dateLocal: '2023-06-04T10:30:00-04:00',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    crew: [],
    ships: [],
    payloads: [],
    launchpad: 'CCAFS',
    details: null,
    links: {},
    autoUpdate: false,
    tbd: false,
    net: false,
    window: null,
    ...overrides,
  });

  it('should create a basic launch', () => {
    const launch = createMockLaunch();
    expect(launch.id).toBe('1');
    expect(launch.name).toBe('Test Launch');
  });

  it('should handle successful launches', () => {
    const launch = createMockLaunch({ success: true });
    expect(LaunchUtils.isSuccessful(launch)).toBe(true);
  });

  it('should handle failed launches', () => {
    const launch = createMockLaunch({ success: false });
    expect(LaunchUtils.isSuccessful(launch)).toBe(false);
  });

  it('should handle upcoming launches', () => {
    const launch = createMockLaunch({ upcoming: true, success: null });
    expect(LaunchUtils.isUpcoming(launch)).toBe(true);
  });

  it('should format dates correctly', () => {
    const launch = createMockLaunch({ dateUtc: '2023-06-04T14:30:00.000Z' });
    const formatted = LaunchUtils.getFormattedDate(launch);
    expect(typeof formatted).toBe('string');
  });

  it('should get status for successful launch', () => {
    const launch = createMockLaunch({ success: true, upcoming: false });
    expect(LaunchUtils.getStatus(launch)).toBe('Sucesso');
  });

  it('should get status for failed launch', () => {
    const launch = createMockLaunch({ success: false, upcoming: false });
    expect(LaunchUtils.getStatus(launch)).toBe('Falha');
  });

  it('should get status for upcoming launch', () => {
    const launch = createMockLaunch({ success: null, upcoming: true });
    expect(LaunchUtils.getStatus(launch)).toBe('Programado');
  });

  it('should handle empty arrays', () => {
    const launch = createMockLaunch({ crew: [], ships: [], payloads: [] });
    expect(launch.crew.length).toBe(0);
    expect(launch.ships.length).toBe(0);
    expect(launch.payloads.length).toBe(0);
  });

  it('should handle populated arrays', () => {
    const launch = createMockLaunch({
      crew: ['crew1', 'crew2'],
      payloads: ['payload1'],
    });
    expect(launch.crew.length).toBe(2);
    expect(launch.payloads.length).toBe(1);
  });

  it('should handle null details', () => {
    const launch = createMockLaunch({ details: null });
    expect(launch.details).toBeNull();
  });

  it('should handle string details', () => {
    const launch = createMockLaunch({ details: 'Some mission details' });
    expect(launch.details).toBe('Some mission details');
  });

  it('should handle special characters in name', () => {
    const launch = createMockLaunch({ name: 'Test & Launch | "Special"' });
    expect(launch.name).toContain('&');
    expect(launch.name).toContain('"');
  });

  describe('Date and Time Handling', () => {
    it('should handle different timezone formats correctly', () => {
      const utcLaunch = createMockLaunch({
        dateUtc: '2023-06-15T14:30:00.000Z',
        dateLocal: '2023-06-15T10:30:00-04:00',
      });

      expect(utcLaunch.dateUtc).toBe('2023-06-15T14:30:00.000Z');
      expect(utcLaunch.dateLocal).toBe('2023-06-15T10:30:00-04:00');
    });

    it('should handle midnight launches', () => {
      const midnightLaunch = createMockLaunch({
        dateUtc: '2023-12-31T00:00:00.000Z',
        dateLocal: '2023-12-30T20:00:00-04:00',
      });

      const formattedDate = LaunchUtils.getFormattedDate(midnightLaunch);
      expect(formattedDate).toBe('30/12/2023');
    });

    it('should handle leap year dates', () => {
      const leapYearLaunch = createMockLaunch({
        dateUtc: '2024-02-29T12:00:00.000Z',
        dateLocal: '2024-02-29T08:00:00-04:00',
      });

      const formattedDate = LaunchUtils.getFormattedDate(leapYearLaunch);
      expect(formattedDate).toBe('29/02/2024');
    });

    it('should handle very old launch dates', () => {
      const oldLaunch = createMockLaunch({
        dateUtc: '2010-06-04T18:45:00.000Z',
        dateLocal: '2010-06-04T14:45:00-04:00',
        details: 'First successful Falcon 9 launch',
      });

      const formattedDate = LaunchUtils.getFormattedDate(oldLaunch);
      expect(formattedDate).toBe('04/06/2010');
    });

    it('should handle future dates', () => {
      const futureLaunch = createMockLaunch({
        dateUtc: '2025-12-25T10:00:00.000Z',
        dateLocal: '2025-12-25T05:00:00-05:00',
        success: null,
        upcoming: true,
      });

      expect(LaunchUtils.isUpcoming(futureLaunch)).toBe(true);
      expect(LaunchUtils.getFormattedDate(futureLaunch)).toBe('25/12/2025');
    });
  });

  describe('Status Determination', () => {
    it('should correctly identify successful launches', () => {
      const successfulLaunch = createMockLaunch({ success: true });

      expect(LaunchUtils.isSuccessful(successfulLaunch)).toBe(true);
      expect(LaunchUtils.getStatus(successfulLaunch)).toBe('Sucesso');
    });

    it('should correctly identify failed launches', () => {
      const failedLaunch = createMockLaunch({
        success: false,
        details: 'Launch failed during ascent',
      });

      expect(LaunchUtils.isSuccessful(failedLaunch)).toBe(false);
      expect(LaunchUtils.getStatus(failedLaunch)).toBe('Falha');
    });

    it('should correctly identify upcoming launches', () => {
      const upcomingLaunch = createMockLaunch({
        dateUtc: '2025-06-04T14:30:00.000Z',
        success: null,
        upcoming: true,
      });

      expect(LaunchUtils.isUpcoming(upcomingLaunch)).toBe(true);
      expect(LaunchUtils.getStatus(upcomingLaunch)).toBe('Programado');
    });

    it('should correctly identify tentative launches', () => {
      const tentativeLaunch = createMockLaunch({
        dateUtc: '2025-08-04T14:30:00.000Z',
        success: null,
        upcoming: true,
        tbd: true,
      });

      expect(LaunchUtils.getStatus(tentativeLaunch)).toBe('Programado');
    });
  });

  describe('Links and References', () => {
    it('should handle empty links object', () => {
      const launchNoLinks = createMockLaunch({ links: {} });
      expect(launchNoLinks.links).toEqual({});
    });

    it('should handle full links object', () => {
      const launchWithLinks = createMockLaunch({
        links: {
          patch: {
            small: 'https://example.com/patch.png',
            large: 'https://example.com/patch_large.png',
          },
          webcast: 'https://youtube.com/watch?v=example',
        },
      });

      expect(launchWithLinks.links.patch).toBeDefined();
      expect(launchWithLinks.links.webcast).toBe('https://youtube.com/watch?v=example');
    });

    it('should handle partial links object', () => {
      const launchPartialLinks = createMockLaunch({
        links: {
          webcast: 'https://youtube.com/watch?v=example',
        },
      });

      expect(launchPartialLinks.links.webcast).toBe('https://youtube.com/watch?v=example');
      expect(launchPartialLinks.links.patch).toBeUndefined();
    });
  });

  describe('Array Properties', () => {
    it('should handle empty arrays', () => {
      const launchNoData = createMockLaunch({
        crew: [],
        ships: [],
        payloads: [],
      });

      expect(launchNoData.crew).toEqual([]);
      expect(launchNoData.ships).toEqual([]);
      expect(launchNoData.payloads).toEqual([]);
    });

    it('should handle populated arrays', () => {
      const launchWithCrew = createMockLaunch({
        crew: ['crew_id_1', 'crew_id_2'],
        ships: ['ship_id_1'],
        payloads: ['payload_id_1', 'payload_id_2'],
      });

      expect(launchWithCrew.crew.length).toBe(2);
      expect(launchWithCrew.payloads.length).toBe(2);
      expect(launchWithCrew.ships.length).toBe(1);
    });
  });

  describe('Real-world SpaceX missions', () => {
    it('should represent Falcon 9 Full Thrust', () => {
      const falcon9FT = createMockLaunch({
        id: 'falcon9ft123',
        name: 'Falcon 9 Full Thrust',
        flightNumber: 32,
        payloads: ['SES-9'],
        details: 'First Falcon 9 Full Thrust with upgraded engines',
      });

      expect(LaunchUtils.isSuccessful(falcon9FT)).toBe(true);
      expect(falcon9FT.flightNumber).toBe(32);
      expect(falcon9FT.rocket).toBe('Falcon 9');
    });

    it('should represent Starship integrated flight test', () => {
      const starshipIFT = createMockLaunch({
        id: 'starship-ift-1',
        name: 'Starship Integrated Flight Test 1',
        flightNumber: 1,
        dateUtc: '2023-04-20T08:33:00.000Z',
        dateLocal: '2023-04-20T03:33:00-05:00',
        success: false,
        rocket: 'Starship',
        launchpad: 'Starbase',
        details: 'First integrated flight test of Starship',
      });

      expect(LaunchUtils.isSuccessful(starshipIFT)).toBe(false);
      expect(LaunchUtils.getStatus(starshipIFT)).toBe('Falha');
      expect(starshipIFT.rocket).toBe('Starship');
    });
  });

  describe('Edge cases', () => {
    it('should handle null details', () => {
      const launchNullDetails = createMockLaunch({ details: null });
      expect(launchNullDetails.details).toBeNull();
    });

    it('should handle empty string details', () => {
      const launchEmptyDetails = createMockLaunch({ details: '' });
      expect(launchEmptyDetails.details).toBe('');
    });

    it('should handle long details string', () => {
      const longDetails =
        'This is a very long details string that contains a lot of information about the launch mission, including details about the rocket, payload, launchpad, and other relevant information that might be displayed to the user.';
      const launchLongDetails = createMockLaunch({ details: longDetails });

      expect(launchLongDetails.details).toContain('This is a very long');
      expect(launchLongDetails.details?.length).toBeGreaterThan(50);
    });

    it('should handle null success property', () => {
      const launchNullSuccess = createMockLaunch({
        dateUtc: '2025-06-04T14:30:00.000Z',
        success: null,
        upcoming: true,
      });

      expect(launchNullSuccess.success).toBeNull();
      expect(LaunchUtils.isSuccessful(launchNullSuccess)).toBe(false);
    });

    it('should handle special characters in name', () => {
      const launchSpecialChars = createMockLaunch({
        name: 'SpaceX Launch & Co. | "Special" [Test]',
      });

      expect(launchSpecialChars.name).toContain('&');
      expect(launchSpecialChars.name).toContain('"');
      expect(launchSpecialChars.name).toContain('[');
    });

    it('should handle zero flight number', () => {
      const launchZeroFlight = createMockLaunch({ flightNumber: 0 });
      expect(launchZeroFlight.flightNumber).toBe(0);
    });

    it('should handle very large flight number', () => {
      const launchHighFlight = createMockLaunch({ flightNumber: 999999 });
      expect(launchHighFlight.flightNumber).toBe(999999);
    });
  });

  describe('Complex Array Operations', () => {
    it('should handle very large crew arrays', () => {
      const largeCrew = Array.from(
        { length: 100 },
        (_, i) => `Crew Member ${i + 1}`
      );
      const massCrewLaunch = createMockLaunch({
        id: '1',
        name: 'Mass Crew Launch',
        rocket: 'Starship',
        launchpad: 'Starbase',
        crew: largeCrew,
      });

      expect(massCrewLaunch.crew).toHaveLength(100);
      expect(massCrewLaunch.crew[0]).toBe('Crew Member 1');
      expect(massCrewLaunch.crew[99]).toBe('Crew Member 100');
    });

    it('should handle crew with special characters', () => {
      const specialCrew = [
        'José María García',
        'François Müller',
        'Владимир Иванов',
        '田中 太郎',
        'محمد علي',
      ];

      const internationalLaunch = createMockLaunch({
        id: '1',
        name: 'International Crew',
        rocket: 'Falcon 9',
        launchpad: 'ISS',
        crew: specialCrew,
      });

      expect(internationalLaunch.crew).toEqual(specialCrew);
      specialCrew.forEach((name) => {
        expect(internationalLaunch.crew).toContain(name);
      });
    });

    it('should handle mixed valid and empty array entries', () => {
      const mixedPayloads = [
        'Valid Payload 1',
        '',
        'Valid Payload 2',
        '   ',
        'Valid Payload 3',
      ];

      const mixedLaunch = createMockLaunch({
        id: '1',
        name: 'Mixed Payload Launch',
        payloads: mixedPayloads,
      });

      expect(mixedLaunch.payloads).toHaveLength(5);
      expect(mixedLaunch.payloads).toContain('Valid Payload 1');
      expect(mixedLaunch.payloads).toContain('');
    });
  });

  describe('Links Object Advanced Scenarios', () => {
    it('should handle multiple Reddit links', () => {
      const redditLaunch = createMockLaunch({
        id: '1',
        name: 'Reddit Launch',
        links: {
          reddit: {
            campaign: 'https://reddit.com/campaign',
            launch: 'https://reddit.com/launch',
            media: 'https://reddit.com/media',
            recovery: 'https://reddit.com/recovery',
          },
        },
      });

      expect(redditLaunch.links.reddit?.campaign).toBeDefined();
      expect(redditLaunch.links.reddit?.launch).toBeDefined();
      expect(redditLaunch.links.reddit?.media).toBeDefined();
      expect(redditLaunch.links.reddit?.recovery).toBeDefined();
    });

    it('should handle Flickr image arrays', () => {
      const flickrLaunch = createMockLaunch({
        id: '1',
        name: 'Flickr Launch',
        links: {
          flickr: {
            small: [
              'https://flickr.com/small1.jpg',
              'https://flickr.com/small2.jpg',
              'https://flickr.com/small3.jpg',
            ],
            original: [
              'https://flickr.com/original1.jpg',
              'https://flickr.com/original2.jpg',
            ],
          },
        },
      });

      expect(flickrLaunch.links.flickr?.small).toHaveLength(3);
      expect(flickrLaunch.links.flickr?.original).toHaveLength(2);
    });

    it('should handle all link types together', () => {
      const comprehensiveLaunch = createMockLaunch({
        id: '1',
        name: 'Comprehensive Links',
        links: {
          patch: {
            small: 'https://patch.small.png',
            large: 'https://patch.large.png',
          },
          reddit: {
            campaign: 'https://reddit.com/campaign',
            launch: 'https://reddit.com/launch',
            media: 'https://reddit.com/media',
            recovery: 'https://reddit.com/recovery',
          },
          flickr: {
            small: ['https://flickr.com/1.jpg'],
            original: ['https://flickr.com/1_original.jpg'],
          },
          presskit: 'https://presskit.pdf',
          webcast: 'https://youtube.com/watch',
          youtube_id: 'abc123',
          article: 'https://news.com/article',
          wikipedia: 'https://wikipedia.org/page',
        },
      });

      expect(comprehensiveLaunch.links.patch).toBeDefined();
      expect(comprehensiveLaunch.links.reddit).toBeDefined();
      expect(comprehensiveLaunch.links.flickr).toBeDefined();
      expect(comprehensiveLaunch.links.presskit).toBeDefined();
      expect(comprehensiveLaunch.links.webcast).toBeDefined();
      expect(comprehensiveLaunch.links.youtube_id).toBeDefined();
      expect(comprehensiveLaunch.links.article).toBeDefined();
      expect(comprehensiveLaunch.links.wikipedia).toBeDefined();
    });
  });

  describe('Real SpaceX Mission Scenarios', () => {
    it('should handle Falcon Heavy Demo Flight data', () => {
      const falconHeavyDemo = createMockLaunch({
        id: '5eb87d42ffd86e000604b384',
        name: 'FalconSat',
        flightNumber: 1,
        dateUtc: '2006-03-24T22:30:00.000Z',
        dateLocal: '2006-03-24T10:30:00+12:00',
        success: false,
        rocket: 'Falcon 1',
        payloads: ['FalconSAT-2'],
        launchpad: 'Kwajalein Atoll',
        details: 'Engine failure at 33 seconds and loss of vehicle',
        links: {
          webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
          article:
            'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
          wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
        },
      });

      expect(falconHeavyDemo.success).toBe(false);
      expect(LaunchUtils.getStatus(falconHeavyDemo)).toBe('Falha');
      expect(LaunchUtils.isSuccessful(falconHeavyDemo)).toBe(false);
    });

    it('should handle Crew Dragon Demo-2 data', () => {
      const crewDragonDemo2 = createMockLaunch({
        id: '5eb87d47ffd86e000604b38a',
        name: 'Crew Dragon Demo-2',
        flightNumber: 94,
        dateUtc: '2020-05-30T19:22:00.000Z',
        dateLocal: '2020-05-30T15:22:00-04:00',
        success: true,
        rocket: 'Falcon 9',
        crew: ['Robert Behnken', 'Douglas Hurley'],
        ships: ['ASDS Just Read The Instructions', 'GO Ms. Tree', 'GO Ms. Chief'],
        payloads: ['Crew Dragon C206'],
        launchpad: 'LC-39A',
        details: 'SpaceX will launch the first crewed mission of the Crew Dragon spacecraft.',
        links: {
          webcast: 'https://youtu.be/xY96v0OIcK4',
          wikipedia: 'https://en.wikipedia.org/wiki/Crew_Dragon_Demo-2',
        },
      });

      expect(crewDragonDemo2.crew).toHaveLength(2);
      expect(crewDragonDemo2.success).toBe(true);
      expect(LaunchUtils.getStatus(crewDragonDemo2)).toBe('Sucesso');
      expect(crewDragonDemo2.crew).toContain('Robert Behnken');
      expect(crewDragonDemo2.crew).toContain('Douglas Hurley');
    });

    it('should handle Starlink mission data', () => {
      const starlinkMission = createMockLaunch({
        id: 'starlink-1-1',
        name: 'Starlink-1',
        flightNumber: 75,
        dateUtc: '2019-05-24T02:30:00.000Z',
        dateLocal: '2019-05-23T22:30:00-04:00',
        success: true,
        rocket: 'Falcon 9',
        ships: ['OCISLY', 'GO Ms. Tree', 'GO Ms. Chief'],
        payloads: ['Starlink v0.9'],
        launchpad: 'CCAFS SLC 40',
        details: 'First Starlink mission with 60 satellites',
        links: {
          webcast: 'https://youtu.be/riBaVeDTEWI',
          article:
            'https://spaceflightnow.com/2019/05/24/spacex-launches-60-starlink-satellites/',
          wikipedia: 'https://en.wikipedia.org/wiki/Starlink',
        },
      });

      expect(starlinkMission.crew).toHaveLength(0);
      expect(starlinkMission.payloads).toContain('Starlink v0.9');
      expect(starlinkMission.ships).toHaveLength(3);
    });
  });

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle flight number zero', () => {
      const zeroFlightLaunch = createMockLaunch({ flightNumber: 0 });
      expect(zeroFlightLaunch.flightNumber).toBe(0);
    });

    it('should handle very large flight numbers', () => {
      const largeFlight = createMockLaunch({
        name: 'Future Flight',
        flightNumber: 999999,
        dateUtc: '2050-01-01T12:00:00.000Z',
        dateLocal: '2050-01-01T08:00:00-04:00',
        success: null,
        upcoming: true,
        rocket: 'Starship',
        launchpad: 'Mars',
        autoUpdate: true,
      });

      expect(largeFlight.flightNumber).toBe(999999);
    });

    it('should handle very long details string', () => {
      const longDetails = 'Lorem ipsum dolor sit amet, '.repeat(1000);
      const detailedLaunch = createMockLaunch({
        name: 'Detailed Launch',
        details: longDetails,
      });

      expect(detailedLaunch.details?.length).toBeGreaterThan(10000);
    });

    it('should handle window value of zero', () => {
      const zeroWindowLaunch = createMockLaunch({
        name: 'Zero Window',
        window: 0,
      });

      expect(zeroWindowLaunch.window).toBe(0);
    });

    it('should handle extremely large window values', () => {
      const largeWindowLaunch = createMockLaunch({
        name: 'Large Window',
        window: 86400 * 7, // 7 days in seconds
      });

      expect(largeWindowLaunch.window).toBe(604800);
    });
  });
});
