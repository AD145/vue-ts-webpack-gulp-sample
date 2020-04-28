declare module "*.scss" {
  declare const styles: {
    readonly [key: string]: string;
  };

  export = styles;
}
