import { Launch, LaunchUtils } from '../../../src/domain/entities/Launch';

describe('Launch Entity - Advanced Scenarios', () => {
  describe('Date and Time Handling', () => {
    it('should handle different timezone formats correctly', () => {
      const utcLaunch: Launch = {
        id: '1',
        name: 'UTC Launch',
        flightNumber: 1,
        dateUtc: '2023-06-15T14:30:00.000Z',
        dateLocal: '2023-06-15T10:30:00-04:00',
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
        window: null
      };

      expect(utcLaunch.dateUtc).toBe('2023-06-15T14:30:00.000Z');
      expect(utcLaunch.dateLocal).toBe('2023-06-15T10:30:00-04:00');
    });

    it('should handle midnight launches', () => {
      const midnightLaunch: Launch = {
        id: '1',
        name: 'Midnight Launch',
        flightNumber: 1,
        dateUtc: '2023-12-31T00:00:00.000Z',
        dateLocal: '2023-12-30T20:00:00-04:00',
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
        window: null
      };

      const formattedDate = LaunchUtils.getFormattedDate(midnightLaunch);
      expect(formattedDate).toBe('30/12/2023');
    });

    it('should handle leap year dates', () => {
      const leapYearLaunch: Launch = {
        id: '1',
        name: 'Leap Year Launch',
        flightNumber: 1,
        dateUtc: '2024-02-29T12:00:00.000Z',
        dateLocal: '2024-02-29T08:00:00-04:00',
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
        window: null
      };

      const formattedDate = LaunchUtils.getFormattedDate(leapYearLaunch);
      expect(formattedDate).toBe('29/02/2024');
    });

    it('should handle very old launch dates', () => {
      const oldLaunch: Launch = {
        id: '1',
        name: 'Historical Launch',
        flightNumber: 1,
        dateUtc: '2010-06-04T18:45:00.000Z',
        dateLocal: '2010-06-04T14:45:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'CCAFS',
        details: 'First successful Falcon 9 launch',
        links: {},
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(LaunchUtils.getFormattedDate(oldLaunch)).toBe('04/06/2010');
    });

    it('should handle future launch dates', () => {
      const futureLaunch: Launch = {
        id: '1',
        name: 'Future Launch',
        flightNumber: 999,
        dateUtc: '2030-12-31T23:59:59.999Z',
        dateLocal: '2030-12-31T19:59:59-04:00',
        success: null,
        upcoming: true,
        rocket: 'Starship',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'Starbase',
        details: null,
        links: {},
        autoUpdate: true,
        tbd: false,
        net: true,
        window: 3600
      };

      expect(LaunchUtils.getFormattedDate(futureLaunch)).toBe('31/12/2030');
      expect(LaunchUtils.isUpcoming(futureLaunch)).toBe(true);
    });
  });

  describe('Complex Array Operations', () => {
    it('should handle very large crew arrays', () => {
      const largeCrew = Array.from({ length: 100 }, (_, i) => `Crew Member ${i + 1}`);
      const massCrewLaunch: Launch = {
        id: '1',
        name: 'Mass Crew Launch',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Starship',
        crew: largeCrew,
        ships: [],
        payloads: [],
        launchpad: 'Starbase',
        details: null,
        links: {},
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

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
        'محمد علي'
      ];
      
      const internationalLaunch: Launch = {
        id: '1',
        name: 'International Crew',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: specialCrew,
        ships: [],
        payloads: [],
        launchpad: 'ISS',
        details: null,
        links: {},
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(internationalLaunch.crew).toEqual(specialCrew);
      specialCrew.forEach(name => {
        expect(internationalLaunch.crew).toContain(name);
      });
    });

    it('should handle mixed valid and empty array entries', () => {
      const mixedPayloads = [
        'Valid Payload 1',
        '',
        'Valid Payload 2',
        '   ',
        'Valid Payload 3'
      ];

      const mixedLaunch: Launch = {
        id: '1',
        name: 'Mixed Payload Launch',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: mixedPayloads,
        launchpad: 'CCAFS',
        details: null,
        links: {},
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(mixedLaunch.payloads).toHaveLength(5);
      expect(mixedLaunch.payloads).toContain('Valid Payload 1');
      expect(mixedLaunch.payloads).toContain('');
    });
  });

  describe('Links Object Advanced Scenarios', () => {
    it('should handle multiple Reddit links', () => {
      const redditLaunch: Launch = {
        id: '1',
        name: 'Reddit Launch',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'CCAFS',
        details: null,
        links: {
          reddit: {
            campaign: 'https://reddit.com/campaign',
            launch: 'https://reddit.com/launch',
            media: 'https://reddit.com/media',
            recovery: 'https://reddit.com/recovery'
          }
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(redditLaunch.links.reddit?.campaign).toBeDefined();
      expect(redditLaunch.links.reddit?.launch).toBeDefined();
      expect(redditLaunch.links.reddit?.media).toBeDefined();
      expect(redditLaunch.links.reddit?.recovery).toBeDefined();
    });

    it('should handle Flickr image arrays', () => {
      const flickrLaunch: Launch = {
        id: '1',
        name: 'Flickr Launch',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'CCAFS',
        details: null,
        links: {
          flickr: {
            small: [
              'https://flickr.com/small1.jpg',
              'https://flickr.com/small2.jpg',
              'https://flickr.com/small3.jpg'
            ],
            original: [
              'https://flickr.com/original1.jpg',
              'https://flickr.com/original2.jpg'
            ]
          }
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(flickrLaunch.links.flickr?.small).toHaveLength(3);
      expect(flickrLaunch.links.flickr?.original).toHaveLength(2);
    });

    it('should handle all link types together', () => {
      const comprehensiveLaunch: Launch = {
        id: '1',
        name: 'Comprehensive Links',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'CCAFS',
        details: null,
        links: {
          patch: {
            small: 'https://patch.small.png',
            large: 'https://patch.large.png'
          },
          reddit: {
            campaign: 'https://reddit.com/campaign',
            launch: 'https://reddit.com/launch',
            media: 'https://reddit.com/media',
            recovery: 'https://reddit.com/recovery'
          },
          flickr: {
            small: ['https://flickr.com/1.jpg'],
            original: ['https://flickr.com/1_original.jpg']
          },
          presskit: 'https://presskit.pdf',
          webcast: 'https://youtube.com/watch',
          youtube_id: 'abc123',
          article: 'https://news.com/article',
          wikipedia: 'https://wikipedia.org/page'
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

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
      const falconHeavyDemo: Launch = {
        id: '5eb87d42ffd86e000604b384',
        name: 'FalconSat',
        flightNumber: 1,
        dateUtc: '2006-03-24T22:30:00.000Z',
        dateLocal: '2006-03-24T10:30:00+12:00',
        success: false,
        upcoming: false,
        rocket: 'Falcon 1',
        crew: [],
        ships: [],
        payloads: ['FalconSAT-2'],
        launchpad: 'Kwajalein Atoll',
        details: 'Engine failure at 33 seconds and loss of vehicle',
        links: {
          webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
          article: 'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
          wikipedia: 'https://en.wikipedia.org/wiki/DemoSat'
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: 0
      };

      expect(falconHeavyDemo.success).toBe(false);
      expect(LaunchUtils.getStatus(falconHeavyDemo)).toBe('Falha');
      expect(LaunchUtils.isSuccessful(falconHeavyDemo)).toBe(false);
    });

    it('should handle Crew Dragon Demo-2 data', () => {
      const crewDragonDemo2: Launch = {
        id: '5eb87d47ffd86e000604b38a',
        name: 'Crew Dragon Demo-2',
        flightNumber: 94,
        dateUtc: '2020-05-30T19:22:00.000Z',
        dateLocal: '2020-05-30T15:22:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: ['Robert Behnken', 'Douglas Hurley'],
        ships: ['ASDS Just Read The Instructions', 'GO Ms. Tree', 'GO Ms. Chief'],
        payloads: ['Crew Dragon C206'],
        launchpad: 'LC-39A',
        details: 'SpaceX will launch the first crewed mission of the Crew Dragon spacecraft.',
        links: {
          webcast: 'https://youtu.be/xY96v0OIcK4',
          wikipedia: 'https://en.wikipedia.org/wiki/Crew_Dragon_Demo-2'
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(crewDragonDemo2.crew).toHaveLength(2);
      expect(crewDragonDemo2.success).toBe(true);
      expect(LaunchUtils.getStatus(crewDragonDemo2)).toBe('Sucesso');
      expect(crewDragonDemo2.crew).toContain('Robert Behnken');
      expect(crewDragonDemo2.crew).toContain('Douglas Hurley');
    });

    it('should handle Starlink mission data', () => {
      const starlinkMission: Launch = {
        id: 'starlink-1-1',
        name: 'Starlink-1',
        flightNumber: 75,
        dateUtc: '2019-05-24T02:30:00.000Z',
        dateLocal: '2019-05-23T22:30:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: ['OCISLY', 'GO Ms. Tree', 'GO Ms. Chief'],
        payloads: ['Starlink v0.9'],
        launchpad: 'CCAFS SLC 40',
        details: 'First Starlink mission with 60 satellites',
        links: {
          webcast: 'https://youtu.be/riBaVeDTEWI',
          article: 'https://spaceflightnow.com/2019/05/24/spacex-launches-60-starlink-satellites/',
          wikipedia: 'https://en.wikipedia.org/wiki/Starlink'
        },
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(starlinkMission.crew).toHaveLength(0);
      expect(starlinkMission.payloads).toContain('Starlink v0.9');
      expect(starlinkMission.ships).toHaveLength(3);
    });
  });

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle flight number zero', () => {
      const zeroFlightLaunch: Launch = {
        id: '1',
        name: 'Test Flight 0',
        flightNumber: 0,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
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
        window: null
      };

      expect(zeroFlightLaunch.flightNumber).toBe(0);
    });

    it('should handle very large flight numbers', () => {
      const largeFlight: Launch = {
        id: '1',
        name: 'Future Flight',
        flightNumber: 999999,
        dateUtc: '2050-01-01T12:00:00.000Z',
        dateLocal: '2050-01-01T08:00:00-04:00',
        success: null,
        upcoming: true,
        rocket: 'Starship',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'Mars',
        details: null,
        links: {},
        autoUpdate: true,
        tbd: false,
        net: false,
        window: null
      };

      expect(largeFlight.flightNumber).toBe(999999);
    });

    it('should handle very long details string', () => {
      const longDetails = 'Lorem ipsum dolor sit amet, '.repeat(1000);
      const detailedLaunch: Launch = {
        id: '1',
        name: 'Detailed Launch',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [],
        ships: [],
        payloads: [],
        launchpad: 'CCAFS',
        details: longDetails,
        links: {},
        autoUpdate: false,
        tbd: false,
        net: false,
        window: null
      };

      expect(detailedLaunch.details?.length).toBeGreaterThan(10000);
    });

    it('should handle window value of zero', () => {
      const zeroWindowLaunch: Launch = {
        id: '1',
        name: 'Zero Window',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
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
        window: 0
      };

      expect(zeroWindowLaunch.window).toBe(0);
    });

    it('should handle extremely large window values', () => {
      const largeWindowLaunch: Launch = {
        id: '1',
        name: 'Large Window',
        flightNumber: 1,
        dateUtc: '2023-01-01T12:00:00.000Z',
        dateLocal: '2023-01-01T08:00:00-04:00',
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
        window: 86400 * 7 // 7 days in seconds
      };

      expect(largeWindowLaunch.window).toBe(604800);
    });
  });
});
