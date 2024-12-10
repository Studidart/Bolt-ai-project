import { create } from 'zustand';
import { gameData } from '../data/gameData';

interface GameState {
  currentRoom: typeof gameData.rooms[keyof typeof gameData.rooms];
  inventory: string[];
  selectedItem: string | null;
  dialog: { text: string; onClose: () => void } | null;
  usedHotspots: Set<string>;
  interact: (hotspotId: string) => void;
  selectItem: (item: string) => void;
  addToInventory: (item: string) => void;
  removeFromInventory: (item: string) => void;
  setDialog: (dialog: GameState['dialog']) => void;
  moveToRoom: (roomId: keyof typeof gameData.rooms) => void;
  markHotspotAsUsed: (hotspotId: string) => void;
  isHotspotUsed: (hotspotId: string) => boolean;
}

export const useGameState = create<GameState>((set, get) => ({
  currentRoom: gameData.rooms.livingRoom,
  inventory: [],
  selectedItem: null,
  dialog: null,
  usedHotspots: new Set<string>(),

  interact: (hotspotId) => {
    const { 
      currentRoom, 
      selectedItem, 
      addToInventory, 
      removeFromInventory, 
      setDialog, 
      moveToRoom,
      isHotspotUsed,
      markHotspotAsUsed,
      selectItem
    } = get();
    
    const hotspot = currentRoom.hotspots.find(h => h.id === hotspotId);
    
    if (!hotspot) return;

    const handleInteraction = (interaction: any) => {
      setDialog({ 
        text: interaction.text,
        onClose: () => {
          setDialog(null);
          if (interaction.gives) {
            addToInventory(interaction.gives);
            selectItem(null); // Deselect item after using it
          }
          if (interaction.takes) {
            removeFromInventory(interaction.takes);
            selectItem(null); // Deselect item after using it
          }
          if (interaction.leadsTo) {
            moveToRoom(interaction.leadsTo);
          }
        }
      });
    };

    // Check for item-specific interaction first
    if (selectedItem && hotspot.interactions?.[selectedItem]) {
      const interaction = hotspot.interactions[selectedItem];
      handleInteraction(interaction);
      if (interaction.oneTimeUse) {
        markHotspotAsUsed(hotspotId);
      }
      return;
    }

    // If hotspot is used but has a permanent interaction (like a door)
    if (isHotspotUsed(hotspotId) && hotspot.defaultInteraction.leadsTo) {
      handleInteraction(hotspot.defaultInteraction);
      return;
    }

    // If hotspot is not used or doesn't have oneTimeUse flag
    if (!isHotspotUsed(hotspotId) || !hotspot.oneTimeUse) {
      handleInteraction(hotspot.defaultInteraction);
      if (hotspot.oneTimeUse) {
        markHotspotAsUsed(hotspotId);
      }
    }
  },

  selectItem: (item) => set({ selectedItem: item }),
  
  addToInventory: (item) => set((state) => ({
    inventory: state.inventory.includes(item) 
      ? state.inventory 
      : [...state.inventory, item]
  })),

  removeFromInventory: (item) => set((state) => ({
    inventory: state.inventory.filter((i) => i !== item),
    selectedItem: get().selectedItem === item ? null : get().selectedItem
  })),

  setDialog: (dialog) => set({ dialog }),

  moveToRoom: (roomId) => set({ 
    currentRoom: gameData.rooms[roomId]
  }),

  markHotspotAsUsed: (hotspotId) => set((state) => ({
    usedHotspots: new Set([...state.usedHotspots, hotspotId])
  })),

  isHotspotUsed: (hotspotId) => get().usedHotspots.has(hotspotId)
}));