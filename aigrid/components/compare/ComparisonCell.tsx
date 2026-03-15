"use client";

interface ComparisonCellProps {
  value: boolean | string | number | "partial";
  type: "boolean" | "text" | "rating" | "price";
  isWinner?: boolean;
}

export function ComparisonCell({ value, type, isWinner }: ComparisonCellProps) {
  if (type === "boolean") {
    if (value === true) {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else if (value === "partial") {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full group relative">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Partial support
          </div>
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </div>
      );
    }
  }

  if (type === "rating") {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="font-semibold text-gray-900">{value}</span>
        </div>
        {isWinner && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Best
          </span>
        )}
      </div>
    );
  }

  if (type === "price") {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="font-semibold text-gray-900">{value}</span>
        {isWinner && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-bold rounded-full">
            Best Value
          </span>
        )}
      </div>
    );
  }

  // Text type
  if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-brand-dark underline text-sm"
      >
        Visit
      </a>
    );
  }

  return (
    <span className="text-sm text-gray-700">{value}</span>
  );
}
