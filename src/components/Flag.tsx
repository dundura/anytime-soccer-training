/* Flag image via flagcdn — Windows browsers don't render flag emojis,
   so always use this for team flags shown in the UI. */

const SIZES = {
  sm: [20, 15],
  md: [24, 18],
  lg: [40, 30],
  xl: [64, 48],
} as const;

export default function Flag({
  code,
  size = 'md',
  className = '',
}: {
  code?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  if (!code) return null;
  const [w, h] = SIZES[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${w}x${h}/${code}.png`}
      srcSet={`https://flagcdn.com/${w * 2}x${h * 2}/${code}.png 2x`}
      width={w}
      height={h}
      alt=""
      loading="lazy"
      className={`inline-block rounded-[2px] shadow-sm align-[-2px] ${className}`}
    />
  );
}
