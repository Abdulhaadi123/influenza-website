/**
 * A stick figure whose limbs are nested groups, so a timeline can pose it
 * joint by joint. Joint positions (for svgOrigin) are in JOINTS.
 */
export const JOINTS: Record<string, string> = {
  "sk-body": "50 80",
  "sk-head": "50 31",
  "sk-armL": "50 37",
  "sk-foreL": "36 58",
  "sk-armR": "50 37",
  "sk-foreR": "64 58",
  "sk-legL": "50 80",
  "sk-shinL": "43 112",
  "sk-legR": "50 80",
  "sk-shinR": "57 112",
};

export default function Skeleton({ className = "", width = 3.2 }: { className?: string; width?: number }) {
  return (
    <svg
      viewBox="0 -6 100 162"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
    >
      <g className="sk-legL">
        <line x1="50" y1="80" x2="43" y2="112" />
        <g className="sk-shinL">
          <line x1="43" y1="112" x2="41" y2="146" />
        </g>
      </g>
      <g className="sk-legR">
        <line x1="50" y1="80" x2="57" y2="112" />
        <g className="sk-shinR">
          <line x1="57" y1="112" x2="59" y2="146" />
        </g>
      </g>
      <g className="sk-body">
        <line x1="50" y1="80" x2="50" y2="33" />
        <g className="sk-head">
          <circle cx="50" cy="20" r="10" />
        </g>
        <g className="sk-armL">
          <line x1="50" y1="37" x2="36" y2="58" />
          <g className="sk-foreL">
            <line x1="36" y1="58" x2="31" y2="80" />
          </g>
        </g>
        <g className="sk-armR">
          <line x1="50" y1="37" x2="64" y2="58" />
          <g className="sk-foreR">
            <line x1="64" y1="58" x2="69" y2="80" />
          </g>
        </g>
      </g>
    </svg>
  );
}
