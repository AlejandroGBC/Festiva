import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-bold tracking-[0.1px]",
    "transition-transform transition-colors duration-200",
    "cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festiva-electric-violet/40",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-festiva-euphoric-pink text-white hover:brightness-95",
        secondary: "bg-festiva-electric-violet text-white hover:brightness-95",
        dark: "bg-festiva-midnight-blue text-white hover:brightness-110",
        success: "bg-festiva-mint-neon text-festiva-midnight-blue hover:brightness-95",
        warning: "bg-festiva-confetti-orange text-festiva-midnight-blue hover:brightness-95",
        outline: "border border-festiva-midnight-blue-300 bg-transparent text-festiva-midnight-blue hover:bg-festiva-midnight-blue/5",
        ghost: "bg-transparent text-festiva-midnight-blue hover:bg-festiva-midnight-blue/10 active:bg-festiva-midnight-blue/20",
        light: "bg-festiva-midnight-blue/5 text-festiva-midnight-blue hover:bg-festiva-midnight-blue/10 active:bg-festiva-midnight-blue/20",
        link: "bg-transparent p-0 text-festiva-midnight-blue underline-offset-4 hover:text-festiva-euphoric-pink",
        social: "bg-white border border-gray-200 text-festiva-midnight-blue hover:border-festiva-electric-violet shadow-sm",
      },

      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-[15px]",
        lg: "h-14 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
      shape: {
        default: "rounded-xl",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
    },
  }
);