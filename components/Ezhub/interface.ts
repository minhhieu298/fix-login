export interface HubItem {
  id: string;
  image: string;
  title: string;
  prioritized: boolean;
  actions: { rename: () => void; duplicate: () => void; remove: () => void };
}
