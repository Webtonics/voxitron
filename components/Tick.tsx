type TickProps = {
  done?: boolean;
  className?: string;
};

export default function Tick({ done = true, className = "" }: TickProps) {
  return (
    <span className={`tick${done ? " is-done" : ""} ${className}`.trim()} aria-hidden="true">
      &#10003;&#10003;
    </span>
  );
}
