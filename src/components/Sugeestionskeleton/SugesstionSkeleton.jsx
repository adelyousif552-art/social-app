import React from "react";

export default function SuggestionSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between my-7 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="size-20 rounded-full bg-gray-300"></div>

            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </>
  );
}