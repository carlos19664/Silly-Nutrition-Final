// components/ui/switch.tsx
import * as React from "react";

type Props = {
  checked?: boolean;
  onCheckedChange?: (val: boolean) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Switch({ checked = false, onCheckedChange, ...rest }: Props) {
  const [on, setOn] = React.useState(checked);
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => {
        const v = !on;
        setOn(v);
        onCheckedChange?.(v);
      }}
      {...rest}
    >
      {on ? "On" : "Off"}
    </button>
  );
}
