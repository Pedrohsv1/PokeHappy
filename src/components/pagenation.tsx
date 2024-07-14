import page from "@/app/page";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

interface PropsPagination {
  page: number;
  numberPages: number;
  handlePagenation: (n: number) => void;
}

export const PaginationComp = ({
  page,
  numberPages,
  handlePagenation,
}: PropsPagination) => {
  return (
    <Pagination>
      <PaginationContent>
        {page != 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePagenation(page - 1)}
            />
          </PaginationItem>
        )}

        {page != 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePagenation(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page <= numberPages && (
          <React.Fragment>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePagenation(page + 1)}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePagenation(page + 1)}
              />
            </PaginationItem>
          </React.Fragment>
        )}
      </PaginationContent>
    </Pagination>
  );
};
