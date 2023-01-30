import type { ComponentType } from "svelte";

export type SideType = 'top' | 'side' | 'right' | 'button'
export interface Nav {
  path: string | string[];
  title: string;
  active?: boolean;
  types?: SideType[];
  component?: ComponentType;
  order?: number;
  children?: Nav[];
}