export type ProjectEstimateView = {
  receivedDate: Date | null;
  figureLevel: string;
  testLevel: string;
  reportLevel: string;
}

export const initProjectEstimateView: ProjectEstimateView = {
  receivedDate: null,
  figureLevel: '',
  testLevel: '',
  reportLevel: '',
};
