import { create } from "zustand";

const useAdminUIStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  closeSidebar: () => set({ sidebarOpen: false }),
}));

export default useAdminUIStore;
