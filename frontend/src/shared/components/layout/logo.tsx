interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/branding/cognibeat-logo.svg"
      alt="CogniBeat"
      className={className}
    />
  );
}