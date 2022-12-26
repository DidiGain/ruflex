export const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export const formatBigNumber = (num: number) => {
  return num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
};
