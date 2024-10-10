export interface IPageAnnotateToBdd {
  cle_arbo_usv: number;
  componentsByCat: {
    headerComponents: {
      component: string;
      text: string;
    }[];
    bodyComponents: {
      component: string;
      text: string;
    }[];
    footerComponents: {
      component: string;
      text: string;
    }[];
  };
}
