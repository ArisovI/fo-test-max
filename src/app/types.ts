export type NewsBody = {
  id?: string;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  description: {
    ru: string;
    uz: string;
    en: string;
  };

  image?: string | null
};
