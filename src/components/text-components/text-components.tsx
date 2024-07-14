import { ComponentProps, ReactNode } from "react";

interface Typography {
  children: ReactNode;
}

export function TypographyH1(props: Typography) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
}

export function TypographyH2(props: Typography) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {props.children}
    </h2>
  );
}

export function TypographyH3(props: Typography) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  );
}

export function TypographyH4(props: Typography) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props.children}
    </h4>
  );
}

export function TypographyP(props: Typography) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">{props.children}</p>
  );
}

export function TypographySmall(props: Typography) {
  return (
    <small className="text-sm font-medium leading-none">{props.children}</small>
  );
}

export function TypographyMuted(props: Typography) {
  return <p className="text-sm text-muted-foreground">{props.children}</p>;
}
