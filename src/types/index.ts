// interface & type use for ts
// interface name {}, type = {}
// interface can group multiple interface same, type is can't

import React from "react";

export interface InfoSimple {
  title: string;
  description: string;
}

export interface InfoInfoHTML {
  title?: string;
  subtitle?: string;
  description?: React.ReactNode;
  code?: React.ReactNode;
}

export interface DynamicSidebar {
  id: string;
  title: string;
  link: string;
  slug: string;
  target: string;
  isActive: boolean;
  description: string;
  submenu?: Array<SectionSidebar>
  sections: Array<InfoInfoHTML>
}

export type SectionSidebar = 
{
  id: string;
  title: string;
  link: string;
  slug: string;
  description: string;
  isActive: boolean;
  sections: Array<InfoInfoHTML>
};

