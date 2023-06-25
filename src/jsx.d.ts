declare namespace JSX {
  interface IntrinsicAttributes {
    class?: any;
  }
}


/**
 * if use slots hava other error too.
 * fix this by https://github.com/vuejs/language-tools/issues/1534
  
 * add shims.d.ts

  declare module "vue/types/jsx" {
    export interface HTMLAttributes {
      [key: `data${any}`]: any;
      [key: `aria${any}`]: string;
    }
  }

  export {};
 */