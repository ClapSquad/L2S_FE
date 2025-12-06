let _navigate: any = null;

export const setNavigate = (nav: any) => {
  _navigate = nav;
};

export const globalNavigate = (path: string) => {
  if (_navigate) _navigate(path);
};
