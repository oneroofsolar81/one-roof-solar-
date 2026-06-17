export {};

declare global {
  interface Window {
    google: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gmpx-place-reviews': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        place?: string;
        'max-reviews'?: number;
      };
    }
  }
}
