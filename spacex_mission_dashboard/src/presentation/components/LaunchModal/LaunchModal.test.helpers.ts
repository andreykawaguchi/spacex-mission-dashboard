import { Launch, LaunchConstructorParams } from '../../../domain/entities/Launch';
import { CustomMission } from '../../../store/slices/launchesSlice';

/**
 * Test helper functions and mock data for LaunchModal tests
 */

export const createMockLaunchParams = (overrides: Partial<LaunchConstructorParams> = {}): LaunchConstructorParams => {
  return {
    id: '1',
    name: 'Falcon Heavy Test Flight',
    flightNumber: 1,
    dateUtc: '2018-02-06T20:45:00.000Z',
    dateLocal: '2018-02-06T15:45:00-05:00',
    success: true,
    upcoming: false,
    rocket: 'Falcon Heavy',
    crew: ['Crew Member 1', 'Crew Member 2'],
    ships: ['Ship 1', 'Ship 2'],
    payloads: ['Tesla Roadster'],
    launchpad: 'VAFB SLC 4E',
    details: 'The Falcon Heavy test flight was the inaugural mission of the SpaceX Falcon Heavy rocket.',
    links: {
      patch: {
        small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
        large: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png'
      },
      reddit: {
        campaign: 'https://www.reddit.com/r/SpaceX/comments/7hjsiw/falcon_heavy_demo_flight_campaign_thread/',
        launch: 'https://www.reddit.com/r/SpaceX/comments/7vizm4/rspacex_falcon_heavy_test_flight_official_launch/',
        media: 'https://www.reddit.com/r/SpaceX/comments/7vmkez/rspacex_falcon_heavy_test_flight_media_thread/',
        recovery: undefined
      },
      flickr: {
        small: [],
        original: ['https://farm5.staticflickr.com/4615/40143096241_11128929df_o.jpg']
      },
      presskit: 'http://www.spacex.com/sites/spacex/files/falconheavypresskit_v1.pdf',
      webcast: 'https://www.youtube.com/watch?v=wbSwFU6tY1c',
      youtube_id: 'wbSwFU6tY1c',
      article: 'https://spaceflightnow.com/2018/02/06/spacex-launches-falcon-heavy-rocket-with-tesla-roadster/',
      wikipedia: 'https://en.wikipedia.org/wiki/Falcon_Heavy_test_flight'
    },
    autoUpdate: true,
    tbd: false,
    net: false,
    window: 7200,
    ...overrides
  };
};

export const createMockLaunch = (overrides: Partial<LaunchConstructorParams> = {}): Launch => {
  const params = createMockLaunchParams(overrides);
  return new Launch(params);
};

export const createMockCustomMission = (overrides: Partial<CustomMission> = {}): CustomMission => {
  return {
    id: 'custom-1',
    name: 'Custom Mission',
    upcoming: true,
    dateUtc: '2024-12-31T12:00:00.000Z',
    rocket: 'Custom Rocket',
    details: 'This is a custom mission for testing',
    custom: true,
    ...overrides
  };
};
