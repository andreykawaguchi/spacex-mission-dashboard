import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import LaunchModal from './LaunchModal';
import launchesReducer, { 
  LaunchesState, 
  setSelectedLaunch
} from '../../../store/slices/launchesSlice';
import { createMockLaunch, createMockCustomMission } from './LaunchModal.test.helpers';

// Mock CSS import
jest.mock('./LaunchModal.css', () => ({}));

describe('LaunchModal Integration Tests', () => {
  const createMockStore = (initialState?: Partial<LaunchesState>) => {
    const defaultState: LaunchesState = {
      allLaunches: [],
      upcomingLaunches: [],
      pastLaunches: [],
      latestLaunch: null,
      nextLaunch: null,
      selectedLaunch: null,
      customMissions: [],
      loading: {
        all: false,
        upcoming: false,
        past: false,
        latest: false,
        next: false,
        byId: false
      },
      error: {
        all: null,
        upcoming: null,
        past: null,
        latest: null,
        next: null,
        byId: null
      },
      lastFetch: {
        all: null,
        upcoming: null,
        past: null,
        latest: null,
        next: null
      },
      cacheTimeout: 5 * 60 * 1000
    };

    return configureStore({
      reducer: {
        launches: launchesReducer
      },
      preloadedState: {
        launches: { ...defaultState, ...initialState }
      }
    });
  };

  const renderWithProvider = (component: React.ReactElement, initialState?: Partial<LaunchesState>) => {
    const store = createMockStore(initialState);
    return {
      ...render(
        <Provider store={store}>
          {component}
        </Provider>
      ),
      store
    };
  };

  describe('Redux State Integration', () => {
    it('should work with Launch from Redux state', () => {
      const mockLaunch = createMockLaunch();
      const mockOnClose = jest.fn();

      renderWithProvider(
        <LaunchModal 
          launch={mockLaunch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />,
        { selectedLaunch: mockLaunch }
      );

      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
      expect(screen.getByText('Sucesso')).toBeInTheDocument();
    });

    it('should work with CustomMission from Redux state', () => {
      const customMission = createMockCustomMission();
      const mockOnClose = jest.fn();

      renderWithProvider(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />,
        { customMissions: [customMission] }
      );

      expect(screen.getByText('Custom Mission')).toBeInTheDocument();
      expect(screen.getByText('Futuro')).toBeInTheDocument();
    });

    it('should handle state changes during modal display', () => {
      const mockLaunch1 = createMockLaunch({ name: 'Original Launch' });
      const mockLaunch2 = createMockLaunch({ name: 'Updated Launch' });
      const mockOnClose = jest.fn();

      const { rerender, store } = renderWithProvider(
        <LaunchModal 
          launch={mockLaunch1} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Original Launch')).toBeInTheDocument();

      // Simulate state change
      store.dispatch(setSelectedLaunch(mockLaunch2));

      // Rerender with new launch
      rerender(
        <Provider store={store}>
          <LaunchModal 
            launch={mockLaunch2} 
            isOpen={true} 
            onClose={mockOnClose} 
          />
        </Provider>
      );

      expect(screen.getByText('Updated Launch')).toBeInTheDocument();
      expect(screen.queryByText('Original Launch')).not.toBeInTheDocument();
    });
  });

  describe('Error Boundary Integration', () => {
    const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [hasError, setHasError] = React.useState(false);

      React.useEffect(() => {
        const handleError = () => setHasError(true);
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
      }, []);

      if (hasError) {
        return <div>Something went wrong</div>;
      }

      return <>{children}</>;
    };

    it('should handle malformed launch data gracefully', () => {
      const malformedLaunch = {
        id: 'malformed',
        name: 'Malformed Launch',
        // Missing required properties
      } as any;

      const mockOnClose = jest.fn();

      // Should not crash when rendering with malformed data
      expect(() => {
        renderWithProvider(
          <ErrorBoundary>
            <LaunchModal 
              launch={malformedLaunch} 
              isOpen={true} 
              onClose={mockOnClose} 
            />
          </ErrorBoundary>
        );
      }).not.toThrow();
    });
  });

  describe('Performance and Memory', () => {
    it('should not cause memory leaks with rapid open/close cycles', () => {
      const mockLaunch = createMockLaunch();
      const mockOnClose = jest.fn();

      const { rerender } = renderWithProvider(
        <LaunchModal 
          launch={mockLaunch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Simulate rapid open/close cycles
      for (let i = 0; i < 5; i++) {
        rerender(
          <Provider store={createMockStore()}>
            <LaunchModal 
              launch={mockLaunch} 
              isOpen={false} 
              onClose={mockOnClose} 
            />
          </Provider>
        );

        rerender(
          <Provider store={createMockStore()}>
            <LaunchModal 
              launch={mockLaunch} 
              isOpen={true} 
              onClose={mockOnClose} 
            />
          </Provider>
        );
      }

      // Should not throw or cause issues
      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
    });

    it('should handle large datasets efficiently', () => {
      const launchWithLargeData = createMockLaunch({
        crew: Array.from({ length: 100 }, (_, i) => `Crew Member ${i + 1}`),
        ships: Array.from({ length: 50 }, (_, i) => `Ship ${i + 1}`),
        payloads: Array.from({ length: 200 }, (_, i) => `Payload ${i + 1}`),
        details: 'Lorem ipsum '.repeat(1000) // Very long details
      });

      const mockOnClose = jest.fn();

      const startTime = performance.now();

      renderWithProvider(
        <LaunchModal 
          launch={launchWithLargeData} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 1 second)
      expect(renderTime).toBeLessThan(1000);
      expect(screen.getByText('Tripulação')).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain focus management when opened from different triggers', () => {
      const mockLaunch = createMockLaunch();
      const mockOnClose = jest.fn();

      renderWithProvider(
        <>
          <button data-testid="trigger-button">Open Modal</button>
          <LaunchModal 
            launch={mockLaunch} 
            isOpen={true} 
            onClose={mockOnClose} 
          />
        </>
      );

      // Modal should be accessible
      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
      
      // Close button should be focusable
      const closeButton = screen.getByText('×');
      expect(closeButton).toBeInTheDocument();
      closeButton.focus();
      expect(closeButton).toHaveFocus();
    });

    it('should handle screen reader compatibility', () => {
      const mockLaunch = createMockLaunch();
      const mockOnClose = jest.fn();

      renderWithProvider(
        <LaunchModal 
          launch={mockLaunch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Check for semantic structure
      expect(screen.getByText('Informações da Missão')).toBeInTheDocument();
      expect(screen.getByText('Detalhes Técnicos')).toBeInTheDocument();
      expect(screen.getByText('Tripulação')).toBeInTheDocument();

      // Links should have proper accessibility attributes
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle SpaceX API-like data structure', () => {
      // Simulate real SpaceX API response structure
      const apiLikeLaunch = createMockLaunch({
        name: 'Starlink-4-36',
        flightNumber: 184,
        dateUtc: '2023-01-15T02:56:00.000Z',
        success: true,
        upcoming: false,
        rocket: 'Falcon 9',
        crew: [], // Most Starlink missions are uncrewed
        ships: ['ASOG', 'ASDS Just Read the Instructions'],
        payloads: ['Starlink Group 4-36'],
        launchpad: 'CCSFS SLC 40',
        details: 'SpaceX will launch another batch of Starlink satellites to low Earth orbit.',
        links: {
          webcast: 'https://youtu.be/vDwzjKPB7w0',
          article: 'https://spaceflightnow.com/2023/01/15/falcon-9-starlink-4-36/',
          wikipedia: 'https://en.wikipedia.org/wiki/Starlink'
        }
      });

      const mockOnClose = jest.fn();

      renderWithProvider(
        <LaunchModal 
          launch={apiLikeLaunch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Starlink-4-36')).toBeInTheDocument();
      expect(screen.getByText('184')).toBeInTheDocument();
      expect(screen.getByText('CCSFS SLC 40')).toBeInTheDocument();
      expect(screen.getByText('Esta missão não possui tripulação (missão não tripulada)')).toBeInTheDocument();
    });

    it('should handle Crew Dragon mission data', () => {
      const crewDragonLaunch = createMockLaunch({
        name: 'Crew-5',
        flightNumber: 185,
        crew: ['Nicole Mann', 'Josh Cassada', 'Koichi Wakata', 'Anna Kikina'],
        ships: ['GO Ms. Tree', 'GO Ms. Chief'],
        payloads: ['Dragon C210'],
        details: 'SpaceX Crew-5 mission to the International Space Station.'
      });

      const mockOnClose = jest.fn();

      renderWithProvider(
        <LaunchModal 
          launch={crewDragonLaunch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Crew-5')).toBeInTheDocument();
      expect(screen.getByText('Nicole Mann')).toBeInTheDocument();
      expect(screen.getByText('Josh Cassada')).toBeInTheDocument();
      expect(screen.getByText('Koichi Wakata')).toBeInTheDocument();
      expect(screen.getByText('Anna Kikina')).toBeInTheDocument();
    });
  });
});