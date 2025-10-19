import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LaunchModal from './LaunchModal';
import { createMockLaunch, createMockCustomMission } from './LaunchModal.test.helpers';

// Mock CSS import
jest.mock('./LaunchModal.css', () => ({}));

describe('LaunchModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Modal Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <LaunchModal 
          launch={null} 
          isOpen={false} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not render when launch is null', () => {
      render(
        <LaunchModal 
          launch={null} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true and launch is provided', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
    });
  });

  describe('Launch Information Display', () => {
    it('should display correct launch information for a Launch entity', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Test mission name
      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
      
      // Test flight number
      expect(screen.getByText('1')).toBeInTheDocument();
      
      // Test rocket
      expect(screen.getByText('Falcon Heavy')).toBeInTheDocument();
      
      // Test launchpad
      expect(screen.getByText('VAFB SLC 4E')).toBeInTheDocument();
      
      // Test status
      expect(screen.getByText('Sucesso')).toBeInTheDocument();
      
      // Test details
      expect(screen.getByText(/The Falcon Heavy test flight was the inaugural mission/)).toBeInTheDocument();
    });

    it('should display correct date and time formatting', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Check for Brazilian date format
      expect(screen.getByText('06/02/2018')).toBeInTheDocument();
      // Time can be formatted differently based on locale, so we check for a pattern
      expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeInTheDocument();
    });

    it('should handle null date gracefully', () => {
      const launch = createMockLaunch({ dateUtc: null as any });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Data não disponível')).toBeInTheDocument();
      expect(screen.getByText('Horário não disponível')).toBeInTheDocument();
    });
  });

  describe('CustomMission Information Display', () => {
    it('should display correct information for a CustomMission', () => {
      const customMission = createMockCustomMission();
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Test mission name
      expect(screen.getByText('Custom Mission')).toBeInTheDocument();
      
      // Test rocket
      expect(screen.getByText('Custom Rocket')).toBeInTheDocument();
      
      // Test status for upcoming custom mission
      expect(screen.getByText('Futuro')).toBeInTheDocument();
      
      // Test flight number should show N/A for custom missions - use getAllByText since there can be multiple N/A
      const naElements = screen.getAllByText('N/A');
      expect(naElements.length).toBeGreaterThan(0);
    });

    it('should show "Concluído" status for completed custom mission', () => {
      const customMission = createMockCustomMission({ upcoming: false });
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Concluído')).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('should display "Programado" for upcoming launches', () => {
      const launch = createMockLaunch({ upcoming: true });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Programado')).toBeInTheDocument();
    });

    it('should display "Sucesso" for successful launches', () => {
      const launch = createMockLaunch({ success: true, upcoming: false });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Sucesso')).toBeInTheDocument();
    });

    it('should display "Falha" for failed launches', () => {
      const launch = createMockLaunch({ success: false, upcoming: false });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Falha')).toBeInTheDocument();
    });

    it('should display "Desconhecido" for launches with null success', () => {
      const launch = createMockLaunch({ success: null, upcoming: false });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Desconhecido')).toBeInTheDocument();
    });
  });

  describe('Technical Details', () => {
    it('should display technical details correctly', () => {
      const launch = createMockLaunch({
        autoUpdate: true,
        tbd: false,
        window: 7200,
        net: true
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Check that the technical details section is rendered
      expect(screen.getByText('Detalhes Técnicos')).toBeInTheDocument();
      expect(screen.getByText('7200 segundos')).toBeInTheDocument(); // window
    });

    it('should handle null window value', () => {
      const launch = createMockLaunch({ window: null });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Check for N/A in window field
      const windowElements = screen.getAllByText('N/A');
      expect(windowElements.length).toBeGreaterThan(0);
    });
  });

  describe('Payloads Section', () => {
    it('should display payloads when available', () => {
      const launch = createMockLaunch({ payloads: ['Tesla Roadster', 'Dummy Payload'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Cargas Úteis')).toBeInTheDocument();
      expect(screen.getByText('Tesla Roadster')).toBeInTheDocument();
      expect(screen.getByText('Dummy Payload')).toBeInTheDocument();
    });

    it('should not display payloads section when empty for Launch', () => {
      const launch = createMockLaunch({ payloads: [] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Cargas Úteis')).not.toBeInTheDocument();
    });

    it('should not display payloads section for CustomMission', () => {
      const customMission = createMockCustomMission();
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Cargas Úteis')).not.toBeInTheDocument();
    });
  });

  describe('Crew Section', () => {
    it('should display crew members when available', () => {
      const launch = createMockLaunch({ crew: ['Astronaut 1', 'Astronaut 2'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.getByText('Astronaut 1')).toBeInTheDocument();
      expect(screen.getByText('Astronaut 2')).toBeInTheDocument();
    });

    it('should display "no crew" message when crew is empty', () => {
      const launch = createMockLaunch({ crew: [] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.getByText('Esta missão não possui tripulação (missão não tripulada)')).toBeInTheDocument();
    });

    it('should display "no crew" message for CustomMission', () => {
      const customMission = createMockCustomMission();
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.getByText('Esta missão não possui tripulação (missão não tripulada)')).toBeInTheDocument();
    });
  });

  describe('Ships Section', () => {
    it('should display ships when available', () => {
      const launch = createMockLaunch({ ships: ['Ship 1', 'Ship 2'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Navios de Apoio')).toBeInTheDocument();
      expect(screen.getByText('Ship 1')).toBeInTheDocument();
      expect(screen.getByText('Ship 2')).toBeInTheDocument();
    });

    it('should not display ships section when empty', () => {
      const launch = createMockLaunch({ ships: [] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Navios de Apoio')).not.toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('should display external links when available', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Links Externos')).toBeInTheDocument();
      expect(screen.getByText('🎥 Transmissão ao Vivo')).toBeInTheDocument();
      expect(screen.getByText('📰 Artigo')).toBeInTheDocument();
      expect(screen.getByText('📖 Wikipedia')).toBeInTheDocument();
      expect(screen.getByText('💬 Reddit')).toBeInTheDocument();
    });

    it('should have correct href attributes for links', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const webcastLink = screen.getByRole('link', { name: /transmissão ao vivo/i });
      const articleLink = screen.getByRole('link', { name: /artigo/i });
      const wikipediaLink = screen.getByRole('link', { name: /wikipedia/i });
      const redditLink = screen.getByRole('link', { name: /reddit/i });

      expect(webcastLink).toHaveAttribute('href', 'https://www.youtube.com/watch?v=wbSwFU6tY1c');
      expect(articleLink).toHaveAttribute('href', 'https://spaceflightnow.com/2018/02/06/spacex-launches-falcon-heavy-rocket-with-tesla-roadster/');
      expect(wikipediaLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Falcon_Heavy_test_flight');
      expect(redditLink).toHaveAttribute('href', 'https://www.reddit.com/r/SpaceX/comments/7hjsiw/falcon_heavy_demo_flight_campaign_thread/');
    });

    it('should not display links section when no links available', () => {
      const launch = createMockLaunch({ 
        links: {
          patch: undefined,
          reddit: undefined,
          flickr: undefined,
          presskit: undefined,
          webcast: undefined,
          youtube_id: undefined,
          article: undefined,
          wikipedia: undefined
        }
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Links Externos')).not.toBeInTheDocument();
    });

    it('should not display links section for CustomMission', () => {
      const customMission = createMockCustomMission();
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Links Externos')).not.toBeInTheDocument();
    });
  });

  describe('Modal Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const closeButton = screen.getByText('×');
      await userEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Escape key is pressed', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when modal content is clicked', async () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Click on the title which is inside modal content
      const title = screen.getByText('Falcon Heavy Test Flight');
      await userEvent.click(title);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should set overflow hidden on body when modal is open', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should reset overflow on body when modal is closed', () => {
      const launch = createMockLaunch();
      const { rerender } = render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <LaunchModal 
          launch={launch} 
          isOpen={false} 
          onClose={mockOnClose} 
        />
      );

      expect(document.body.style.overflow).toBe('unset');
    });

    it('should have proper link attributes for external links', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const externalLinks = screen.getAllByRole('link');
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty or null payloads gracefully', () => {
      const launch = createMockLaunch({ payloads: ['', null as any, 'Valid Payload'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Cargas Úteis')).toBeInTheDocument();
      expect(screen.getByText('Valid Payload')).toBeInTheDocument();
      // Fallback names are generated based on index + 1
      expect(screen.getByText('Payload 1')).toBeInTheDocument(); // fallback for empty string at index 0
      expect(screen.getByText('Payload 2')).toBeInTheDocument(); // fallback for null at index 1
    });

    it('should handle empty or null crew members gracefully', () => {
      const launch = createMockLaunch({ crew: ['', null as any, 'Valid Crew'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.getByText('Valid Crew')).toBeInTheDocument();
      expect(screen.getByText('Tripulante 1')).toBeInTheDocument(); // fallback for empty string
      expect(screen.getByText('Tripulante 2')).toBeInTheDocument(); // fallback for null
    });

    it('should handle empty or null ships gracefully', () => {
      const launch = createMockLaunch({ ships: ['', null as any, 'Valid Ship'] });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Navios de Apoio')).toBeInTheDocument();
      expect(screen.getByText('Valid Ship')).toBeInTheDocument();
      expect(screen.getByText('Navio 1')).toBeInTheDocument(); // fallback for empty string
      expect(screen.getByText('Navio 2')).toBeInTheDocument(); // fallback for null
    });

    it('should handle missing details gracefully', () => {
      const launch = createMockLaunch({ details: null });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Descrição da Missão')).not.toBeInTheDocument();
    });

    it('should handle empty details gracefully', () => {
      const launch = createMockLaunch({ details: '' });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.queryByText('Descrição da Missão')).not.toBeInTheDocument();
    });
  });

  describe('Modal State Management', () => {
    it('should clean up event listeners on unmount', () => {
      const launch = createMockLaunch();
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('should handle isOpen state changes correctly', () => {
      const launch = createMockLaunch();
      const { rerender } = render(
        <LaunchModal 
          launch={launch} 
          isOpen={false} 
          onClose={mockOnClose} 
        />
      );

      // Should not be visible when closed
      expect(screen.queryByText('Falcon Heavy Test Flight')).not.toBeInTheDocument();

      // Rerender with isOpen=true
      rerender(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Should now be visible
      expect(screen.getByText('Falcon Heavy Test Flight')).toBeInTheDocument();
    });

    it('should handle launch prop changes correctly', () => {
      const launch1 = createMockLaunch({ name: 'First Mission' });
      const launch2 = createMockLaunch({ name: 'Second Mission' });
      
      const { rerender } = render(
        <LaunchModal 
          launch={launch1} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('First Mission')).toBeInTheDocument();

      // Change launch prop
      rerender(
        <LaunchModal 
          launch={launch2} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Second Mission')).toBeInTheDocument();
      expect(screen.queryByText('First Mission')).not.toBeInTheDocument();
    });
  });

  describe('Data Formatting and Display', () => {
    it('should format very long launch windows correctly', () => {
      const launch = createMockLaunch({ window: 86400 }); // 24 hours
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('86400 segundos')).toBeInTheDocument();
    });

    it('should handle zero window value', () => {
      const launch = createMockLaunch({ window: 0 });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // When window is 0 (falsy), it should display N/A
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('should display correct flight number formatting', () => {
      const launch = createMockLaunch({ flightNumber: 123 });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should handle flight number 0', () => {
      const launch = createMockLaunch({ flightNumber: 0 });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Complex Link Scenarios', () => {
    it('should display partial links correctly', () => {
      const launch = createMockLaunch({ 
        links: {
          webcast: 'https://youtube.com/watch?v=123',
          article: undefined,
          wikipedia: undefined,
          reddit: undefined
        }
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Links Externos')).toBeInTheDocument();
      expect(screen.getByText('🎥 Transmissão ao Vivo')).toBeInTheDocument();
      expect(screen.queryByText('📰 Artigo')).not.toBeInTheDocument();
      expect(screen.queryByText('📖 Wikipedia')).not.toBeInTheDocument();
      expect(screen.queryByText('💬 Reddit')).not.toBeInTheDocument();
    });

    it('should handle empty reddit object', () => {
      const launch = createMockLaunch({ 
        links: {
          webcast: 'https://youtube.com/watch?v=123',
          reddit: {}
        }
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('🎥 Transmissão ao Vivo')).toBeInTheDocument();
      expect(screen.queryByText('💬 Reddit')).not.toBeInTheDocument();
    });

    it('should handle reddit with only some properties', () => {
      const launch = createMockLaunch({ 
        links: {
          reddit: {
            campaign: 'https://reddit.com/campaign',
            launch: undefined,
            media: undefined,
            recovery: undefined
          }
        }
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('💬 Reddit')).toBeInTheDocument();
      const redditLink = screen.getByRole('link', { name: /reddit/i });
      expect(redditLink).toHaveAttribute('href', 'https://reddit.com/campaign');
    });
  });

  describe('Array Handling Edge Cases', () => {
    it('should handle mixed valid and invalid payload entries', () => {
      const launch = createMockLaunch({ 
        payloads: ['Valid Payload', '', 'Another Valid', null as any, undefined as any] 
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Cargas Úteis')).toBeInTheDocument();
      expect(screen.getByText('Valid Payload')).toBeInTheDocument();
      expect(screen.getByText('Another Valid')).toBeInTheDocument();
      
      // Should show fallback names for invalid entries
      expect(screen.getByText('Payload 2')).toBeInTheDocument(); // for empty string at index 1
      expect(screen.getByText('Payload 4')).toBeInTheDocument(); // for null at index 3
      expect(screen.getByText('Payload 5')).toBeInTheDocument(); // for undefined at index 4
    });

    it('should handle very long array of crew members', () => {
      const largeCrew = Array.from({ length: 10 }, (_, i) => `Astronaut ${i + 1}`);
      const launch = createMockLaunch({ crew: largeCrew });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.getByText('Astronaut 1')).toBeInTheDocument();
      expect(screen.getByText('Astronaut 10')).toBeInTheDocument();
    });

    it('should handle single item arrays', () => {
      const launch = createMockLaunch({ 
        crew: ['Solo Astronaut'],
        ships: ['Solo Ship'],
        payloads: ['Solo Payload']
      });
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Solo Astronaut')).toBeInTheDocument();
      expect(screen.getByText('Solo Ship')).toBeInTheDocument();
      expect(screen.getByText('Solo Payload')).toBeInTheDocument();
    });
  });

  describe('Keyboard and Mouse Interactions', () => {
    it('should not call onClose for other key presses', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle multiple escape key presses', () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('should handle rapid close button clicks', async () => {
      const launch = createMockLaunch();
      
      render(
        <LaunchModal 
          launch={launch} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const closeButton = screen.getByText('×');
      await userEvent.click(closeButton);
      await userEvent.click(closeButton);
      await userEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });
  });

  describe('CustomMission Edge Cases', () => {
    it('should handle CustomMission with undefined properties', () => {
      const customMission = createMockCustomMission({ 
        details: undefined,
        rocket: undefined as any
      });
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText('Custom Mission')).toBeInTheDocument();
      expect(screen.queryByText('Descrição da Missão')).not.toBeInTheDocument();
    });

    it('should handle CustomMission with very long name', () => {
      const longName = 'Very Long Custom Mission Name That Should Still Display Correctly In The Modal';
      const customMission = createMockCustomMission({ name: longName });
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('should handle CustomMission with empty strings', () => {
      const customMission = createMockCustomMission({ 
        name: '',
        rocket: '',
        details: ''
      });
      
      render(
        <LaunchModal 
          launch={customMission} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      // Should still render the modal even with empty strings
      expect(screen.getByText('Tripulação')).toBeInTheDocument();
      expect(screen.queryByText('Descrição da Missão')).not.toBeInTheDocument();
    });
  });
});