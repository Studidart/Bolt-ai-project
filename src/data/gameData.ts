export interface Interaction {
  text: string;
  gives?: string;
  takes?: string;
  leadsTo?: string;
  oneTimeUse?: boolean;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string;
  defaultInteraction: Interaction;
  interactions?: Record<string, Interaction>;
  oneTimeUse?: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const gameItems: Record<string, GameItem> = {
  key: {
    id: 'key',
    name: 'Brass Key',
    image:
      'https://freepik.com/premium-vector/hand-drawn-antique-key-sketch-style-vintage-key-old-design-illustration_10340680.htm',
    description: 'An old brass key that might unlock something.',
  },
  note: {
    id: 'note',
    name: 'Mysterious Note',
    image:
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300',
    description: 'A handwritten note with a cryptic message.',
  },
};

export const gameData = {
  rooms: {
    livingRoom: {
      id: 'livingRoom',
      name: 'Living Room',
      background:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920',
      hotspots: [
        {
          id: 'door',
          x: 75,
          y: 30,
          width: 15,
          height: 45,
          image:
            'https://images.unsplash.com/photo-1516213335993-159eca2981af?auto=format&fit=crop&q=80&w=300',
          defaultInteraction: {
            text: "It's locked. I need to find the key.",
          },
          interactions: {
            key: {
              text: 'The door unlocks. Now I can access the kitchen whenever I want.',
              leadsTo: 'kitchen',
            },
          },
        },
        {
          id: 'drawer',
          x: 10,
          y: 70,
          width: 15,
          height: 10,
          image:
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=300',
          defaultInteraction: {
            text: 'I found a key in the drawer!',
            gives: 'key',
          },
          oneTimeUse: true,
        },
      ],
    },
    kitchen: {
      id: 'kitchen',
      name: 'Kitchen',
      background:
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1920',
      hotspots: [
        {
          id: 'livingRoomDoor',
          x: 5,
          y: 30,
          width: 10,
          height: 45,
          image:
            'https://images.unsplash.com/photo-1516213335993-159eca2981af?auto=format&fit=crop&q=80&w=300',
          defaultInteraction: {
            text: 'Back to the living room',
            leadsTo: 'livingRoom',
          },
        },
        {
          id: 'note',
          x: 45,
          y: 50,
          width: 10,
          height: 5,
          image:
            'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300',
          defaultInteraction: {
            text: "A mysterious note reads: 'The treasure lies behind the painting...'",
            gives: 'note',
          },
          oneTimeUse: true,
        },
      ],
    },
  },
};
