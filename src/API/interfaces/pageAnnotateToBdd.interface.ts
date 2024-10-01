export interface IPageAnnotateToBdd {
  template: string;
  pageName: string;
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
