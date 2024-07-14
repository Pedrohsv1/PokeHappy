import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import Link from "next/link";

export interface BreadProps {
  breads: Bread[];
  namePage: string;
}

interface Bread {
  name: string;
  href: string;
}

export const BreadCrumbComp = ({ breads, namePage }: BreadProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breads.map((bread, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <Link
                className="transition-colors hover:text-foreground"
                href={bread.href}
              >
                {bread.name}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{namePage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
