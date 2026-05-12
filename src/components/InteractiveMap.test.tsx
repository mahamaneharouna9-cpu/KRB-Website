import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import InteractiveMap from './InteractiveMap';

// Mock matchMedia which maplibre might use
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Avoid WebGL issues in jsdom by mocking react-map-gl/maplibre entirely
vi.mock('react-map-gl/maplibre', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-map">{children}</div>,
    Marker: ({ children, longitude, latitude, onClick }: any) => (
      <div 
        data-testid={`mock-marker-${longitude}-${latitude}`}
        onClick={() => {
          if (onClick) {
            onClick({ originalEvent: { stopPropagation: () => {} } });
          }
        }}
      >
        {children}
      </div>
    )
  };
});

// Mock fetch for the basemap style
global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({ layers: [] })
});

describe('InteractiveMap Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders a loading spinner initially, then the map after fetching styles', async () => {
    render(<InteractiveMap />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toBeInTheDocument();
    });
  });

  test('shows markers and opens project details on marker click', async () => {
    render(<InteractiveMap />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toBeInTheDocument();
    });

    const markers = await screen.findAllByTestId('mock-marker-5.2692-14.8888');
    const marker = markers[0];
    
    expect(screen.queryByText('Description du Projet')).not.toBeInTheDocument();

    fireEvent.click(marker);

    await waitFor(() => {
      expect(screen.getAllByText('PRRIA').length).toBeGreaterThan(0);
    });
    
    expect(screen.getAllByText('Renforcement de la Résilience afin de lutter contre l’Insécurité Alimentaire').length).toBeGreaterThan(0);
    
    const globalViewBtn = screen.getByText('Vue Globale');
    fireEvent.click(globalViewBtn);

    await waitFor(() => {
       expect(screen.queryByText('Description du Projet')).not.toBeInTheDocument();
    });
  });
});
