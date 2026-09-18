"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface ArchitecturalSelectProps {
  id?: string;
  value: string;
  onValueChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
  "aria-label"?: string;
}

export function ArchitecturalSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  "aria-label": ariaLabel,
}: ArchitecturalSelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className="w-full flex items-center justify-between bg-transparent border-b border-[var(--color-stone-400)] pb-2 pt-1 text-sm sm:text-base text-[var(--color-stone-900)] font-medium focus:outline-none focus:border-[var(--color-navy-900)] cursor-pointer transition-colors group text-left"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="w-4 h-4 text-[var(--color-stone-500)] group-hover:text-[var(--color-stone-900)] transition-transform duration-200 flex-shrink-0 ml-2"
            strokeWidth={1.5}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 min-w-[var(--radix-select-trigger-width)] bg-[#14120E] text-stone-200 border border-stone-800 shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <SelectPrimitive.Viewport className="p-1.5 space-y-0.5 max-h-[300px]">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs tracking-wider uppercase cursor-pointer outline-none hover:bg-stone-800/80 hover:text-white data-[highlighted]:bg-stone-800/90 data-[highlighted]:text-white data-[state=checked]:text-[var(--color-gold-300)] transition-colors select-none"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="w-3.5 h-3.5 text-[var(--color-gold-400)]" strokeWidth={2} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
