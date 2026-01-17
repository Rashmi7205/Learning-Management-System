"use client";

import React, { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  LayoutDashboard,
  CheckSquare,
  Folder,
  Calendar,
  Users,
  BarChart3,
  FileText,
  Settings,
  User,
  ChevronDown,
  Plus,
  Filter,
  Clock,
  CheckCircle,
  Flag,
  Archive,
  Eye,
  TrendingUp,
  Star,
  Users2,
  PieChart,
  FolderOpen,
  Share2,
  Upload,
  Lock,
  Bell,
  Zap,
} from "lucide-react";

/** ======================= Local SVG paths (inline) ======================= */
const svgPaths = {
  p10dcabc0:
    "M8 11L3 6.00001L3.7 5.30001L8 9.60001L12.3 5.30001L13 6.00001L8 11Z",
  p13593580:
    "M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z",
  p154b5b00:
    "M14.5 13.793L10.724 10.0169C11.6313 8.92758 12.0838 7.53039 11.9872 6.11596C11.8907 4.70154 11.2525 3.37879 10.2055 2.42289C9.15856 1.46699 7.78336 0.951523 6.36601 0.983731C4.94866 1.01594 3.59829 1.59334 2.59581 2.59581C1.59334 3.59829 1.01594 4.94866 0.983731 6.36601C0.951523 7.78336 1.46699 9.15856 2.42289 10.2055C3.37879 11.2525 4.70154 11.8907 6.11596 11.9872C7.53039 12.0838 8.92758 11.6313 10.0169 10.724L13.793 14.5L14.5 13.793ZM2 6.5C2 5.60999 2.26392 4.73996 2.75839 3.99994C3.25286 3.25992 3.95566 2.68314 4.77793 2.34255C5.6002 2.00195 6.505 1.91284 7.37791 2.08647C8.25082 2.2601 9.05265 2.68869 9.68198 3.31802C10.3113 3.94736 10.7399 4.74918 10.9135 5.6221C11.0872 6.49501 10.9981 7.39981 10.6575 8.22208C10.3169 9.04435 9.74009 9.74715 9.00007 10.2416C8.26005 10.7361 7.39002 11 6.5 11C5.30694 10.9987 4.16311 10.5242 3.31949 9.68052C2.47586 8.8369 2.00133 7.69307 2 6.5Z",
  p36880f80:
    "M0.32 0C0.20799 0 0.151984 0 0.109202 0.0217987C0.0715695 0.0409734 0.0409734 0.0715695 0.0217987 0.109202C0 0.151984 0 0.20799 0 0.32V6.68C0 6.79201 0 6.84801 0.0217987 6.8908C0.0409734 6.92843 0.0715695 6.95902 0.109202 6.9782C0.151984 7 0.207989 7 0.32 7L3.68 7C3.79201 7 3.84802 7 3.8908 6.9782C3.92843 6.95903 3.95903 6.92843 3.9782 6.8908C4 6.84801 4 6.79201 4 6.68V4.32C4 4.20799 4 4.15198 4.0218 4.1092C4.04097 4.07157 4.07157 4.04097 4.1092 4.0218C4.15198 4 4.20799 4 4.32 4L19.68 4C19.792 4 19.848 4 19.8908 4.0218C19.9284 4.04097 19.959 4.07157 19.9782 4.1092C20 4.15198 20 4.20799 20 4.32V6.68C20 6.79201 20 6.84802 20.0218 6.8908C20.041 6.92843 20.0716 6.95903 20.1092 6.9782C20.152 7 20.208 7 20.32 7L23.68 7C23.792 7 23.848 7 23.8908 6.9782C23.9284 6.95903 23.959 6.92843 23.9782 6.8908C24 6.84802 24 6.79201 24 6.68V0.32C24 0.20799 24 0.151984 23.9782 0.109202C23.959 0.0715695 23.9284 0.0409734 23.8908 0.0217987C23.848 0 23.792 0 23.68 0H0.32Z",
  p355df480:
    "M0.32 16C0.20799 16 0.151984 16 0.109202 15.9782C0.0715695 15.959 0.0409734 15.9284 0.0217987 15.8908C0 15.848 0 15.792 0 15.68V9.32C0 9.20799 0 9.15198 0.0217987 9.1092C0.0409734 9.07157 0.0715695 9.04097 0.109202 9.0218C0.151984 9 0.207989 9 0.32 9H3.68C3.79201 9 3.84802 9 3.8908 9.0218C3.92843 9.04097 3.95903 9.07157 3.9782 9.1092C4 9.15198 4 9.20799 4 9.32V11.68C4 11.792 4 11.848 4.0218 11.8908C4.04097 11.9284 4.07157 11.959 4.1092 11.9782C4.15198 12 4.20799 12 4.32 12L19.68 12C19.792 12 19.848 12 19.8908 11.9782C19.9284 11.959 19.959 11.9284 19.9782 11.8908C20 11.848 20 11.792 20 11.68V9.32C20 9.20799 20 9.15199 20.0218 9.1092C20.041 9.07157 20.0716 9.04098 20.1092 9.0218C20.152 9 20.208 9 20.32 9H23.68C23.792 9 23.848 9 23.8908 9.0218C23.9284 9.04098 23.959 9.07157 23.9782 9.1092C24 9.15199 24 9.20799 24 9.32V15.68C24 15.792 24 15.848 23.9782 15.8908C23.959 15.9284 23.9284 15.959 23.8908 15.9782C23.848 16 23.792 16 23.68 16H0.32Z",
  pfa0d600:
    "M6.32 10C6.20799 10 6.15198 10 6.1092 9.9782C6.07157 9.95903 6.04097 9.92843 6.0218 9.8908C6 9.84802 6 9.79201 6 9.68V6.32C6 6.20799 6 6.15198 6.0218 6.1092C6.04097 6.07157 6.07157 6.04097 6.1092 6.0218C6.15198 6 6.20799 6 6.32 6L17.68 6C17.792 6 17.848 6 17.8908 6.0218C17.9284 6.04097 17.959 6.07157 17.9782 6.1092C18 6.15198 18 6.20799 18 6.32V9.68C18 9.79201 18 9.84802 17.9782 9.8908C17.959 9.92843 17.9284 9.95903 17.8908 9.9782C17.848 10 17.792 10 17.68 10H6.32Z",
};

// Softer spring animation curve
const softSpringEasing = "cubic-bezier(0.25, 1.1, 0.4, 1)";

/* ----------------------------- Brand / Logos ----------------------------- */

function InterfacesLogoSquare({ isDark }: { isDark: boolean }) {
  return (
    <div className="aspect-24/24 grow min-h-px min-w-px overflow-clip relative shrink-0">
      <div className="absolute aspect-24/16 left-0 right-0 top-1/2 -translate-y-1/2">
        <svg className="block size-full" fill="none" viewBox="0 0 24 16">
          <g>
            <path
              d={svgPaths.p36880f80}
              fill={isDark ? "#FAFAFA" : "#0A0A0A"}
            />
            <path
              d={svgPaths.p355df480}
              fill={isDark ? "#FAFAFA" : "#0A0A0A"}
            />
            <path d={svgPaths.pfa0d600} fill={isDark ? "#FAFAFA" : "#0A0A0A"} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BrandBadge({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex items-center p-1 w-full">
        <div className="h-10 w-8 flex items-center justify-center pl-2">
          <InterfacesLogoSquare isDark={isDark} />
        </div>
        <div className="px-2 py-1">
          <div
            className={`font-semibold text-base ${
              isDark ? "text-neutral-50" : "text-neutral-950"
            }`}
          >
            CourseLoop
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Avatar -------------------------------- */

function AvatarCircle({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`relative rounded-full shrink-0 size-8 ${
        isDark ? "bg-neutral-900" : "bg-neutral-100"
      }`}
    >
      <div className="flex items-center justify-center size-8">
        <User
          size={16}
          className={isDark ? "text-neutral-50" : "text-neutral-950"}
        />
      </div>
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full border pointer-events-none ${
          isDark ? "border-neutral-800" : "border-neutral-200"
        }`}
      />
    </div>
  );
}

/* ------------------------------ Search Input ----------------------------- */

function SearchContainer({
  isCollapsed = false,
  isDark,
}: {
  isCollapsed?: boolean;
  isDark: boolean;
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`h-10 relative rounded-lg flex items-center transition-all duration-500 ${
          isCollapsed ? "w-10 min-w-10 justify-center" : "w-full"
        } ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div
          className={`flex items-center justify-center shrink-0 transition-all duration-500 ${
            isCollapsed ? "p-1" : "px-1"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="size-8 flex items-center justify-center">
            <SearchIcon
              size={16}
              className={isDark ? "text-neutral-50" : "text-neutral-950"}
            />
          </div>
        </div>

        <div
          className={`flex-1 relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex flex-col justify-center size-full">
            <div className="flex flex-col gap-2 items-start justify-center pr-2 py-1 w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={`w-full bg-transparent border-none outline-none text-sm ${
                  isDark
                    ? "text-neutral-50 placeholder:text-neutral-500"
                    : "text-neutral-950 placeholder:text-neutral-400"
                }`}
                tabIndex={isCollapsed ? -1 : 0}
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-lg border pointer-events-none ${
            isDark ? "border-neutral-800" : "border-neutral-200"
          }`}
        />
      </div>
    </div>
  );
}

/* --------------------------- Types / Content Map -------------------------- */

interface MenuItemT {
  icon?: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  children?: MenuItemT[];
}

interface MenuSectionT {
  title: string;
  items: MenuItemT[];
}

interface SidebarContent {
  title: string;
  sections: MenuSectionT[];
}

function getSidebarContent(
  activeSection: string,
  isDark: boolean
): SidebarContent {
  const contentMap: Record<string, SidebarContent> = {
    dashboard: {
      title: "Dashboard",
      sections: [
        {
          title: "Dashboard Types",
          items: [
            {
              icon: (
                <Eye
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Overview",
              isActive: true,
            },
            {
              icon: (
                <LayoutDashboard
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Executive Summary",
              hasDropdown: true,
              children: [
                { label: "Revenue Overview" },
                { label: "Key Performance Indicators" },
                { label: "Strategic Goals Progress" },
                { label: "Department Highlights" },
              ],
            },
            {
              icon: (
                <PieChart
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Operations Dashboard",
              hasDropdown: true,
              children: [
                { label: "Project Timeline" },
                { label: "Resource Allocation" },
                { label: "Team Performance" },
                { label: "Capacity Planning" },
              ],
            },
            {
              icon: (
                <TrendingUp
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Financial Dashboard",
              hasDropdown: true,
              children: [
                { label: "Budget vs Actual" },
                { label: "Cash Flow Analysis" },
                { label: "Expense Breakdown" },
                { label: "Profit & Loss Summary" },
              ],
            },
          ],
        },
      ],
    },

    tasks: {
      title: "Tasks",
      sections: [
        {
          title: "Quick Actions",
          items: [
            {
              icon: (
                <Plus
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "New task",
            },
            {
              icon: (
                <Filter
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Filter tasks",
            },
          ],
        },
        {
          title: "My Tasks",
          items: [
            {
              icon: (
                <Clock
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Due today",
              hasDropdown: true,
              children: [
                {
                  icon: (
                    <Flag
                      size={14}
                      className={
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }
                    />
                  ),
                  label: "Review design mockups",
                },
                {
                  icon: (
                    <CheckCircle
                      size={14}
                      className={
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }
                    />
                  ),
                  label: "Update documentation",
                },
                {
                  icon: (
                    <Zap
                      size={14}
                      className={
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }
                    />
                  ),
                  label: "Test new feature",
                },
              ],
            },
          ],
        },
      ],
    },

    projects: {
      title: "Projects",
      sections: [
        {
          title: "Quick Actions",
          items: [
            {
              icon: (
                <Plus
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "New project",
            },
            {
              icon: (
                <Filter
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Filter projects",
            },
          ],
        },
        {
          title: "Active Projects",
          items: [
            {
              icon: (
                <FolderOpen
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Web Application",
              hasDropdown: true,
              children: [
                { label: "Frontend development" },
                { label: "API integration" },
                { label: "Testing & QA" },
              ],
            },
          ],
        },
      ],
    },

    settings: {
      title: "Settings",
      sections: [
        {
          title: "Account",
          items: [
            {
              icon: (
                <User
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Profile settings",
            },
            {
              icon: (
                <Lock
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Security",
            },
            {
              icon: (
                <Bell
                  size={16}
                  className={isDark ? "text-neutral-50" : "text-neutral-950"}
                />
              ),
              label: "Notifications",
            },
          ],
        },
      ],
    },
  };

  return contentMap[activeSection] || contentMap.tasks;
}

/* ---------------------------- Left Icon Nav Rail -------------------------- */

function IconNavButton({
  children,
  isActive = false,
  onClick,
  isDark,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-colors duration-500
        ${
          isActive
            ? isDark
              ? "bg-neutral-800 text-neutral-50"
              : "bg-neutral-200 text-neutral-950"
            : isDark
            ? "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
            : "hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950"
        }`}
      style={{ transitionTimingFunction: softSpringEasing }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function IconNavigation({
  activeSection,
  onSectionChange,
  isDark,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isDark: boolean;
}) {
  const navItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={16} />,
      label: "Dashboard",
    },
    { id: "tasks", icon: <CheckSquare size={16} />, label: "Tasks" },
    { id: "projects", icon: <Folder size={16} />, label: "Projects" },
    { id: "settings", icon: <Settings size={16} />, label: "Settings" },
  ];

  return (
    <aside
      className={`flex flex-col gap-2 items-center p-4 w-16 h-screen rounded-l-2xl border-r ${
        isDark ? "bg-black border-neutral-800" : "bg-white border-neutral-200"
      }`}
    >
      {/* Logo */}
      <div className="mb-2 size-10 flex items-center justify-center">
        <div className="size-7">
          <InterfacesLogoSquare isDark={isDark} />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-2 w-full items-center">
        {navItems.map((item) => (
          <IconNavButton
            key={item.id}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
            isDark={isDark}
          >
            {item.icon}
          </IconNavButton>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bottom section */}
      <div className="flex flex-col gap-2 w-full items-center">
        <div className="size-8">
          <AvatarCircle isDark={isDark} />
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------ Right Sidebar ----------------------------- */

function SectionTitle({
  title,
  onToggleCollapse,
  isCollapsed,
  isDark,
}: {
  title: string;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
  isDark: boolean;
}) {
  if (isCollapsed) {
    return (
      <div
        className="w-full flex justify-center transition-all duration-500"
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 ${
            isDark
              ? "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
              : "hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
          aria-label="Expand sidebar"
        >
          <span className="inline-block rotate-180">
            <ChevronDown size={16} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden transition-all duration-500"
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center h-10">
          <div className="px-2 py-1">
            <div
              className={`font-semibold text-lg ${
                isDark ? "text-neutral-50" : "text-neutral-950"
              }`}
            >
              {title}
            </div>
          </div>
        </div>
        <div className="pr-1">
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 ${
              isDark
                ? "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
                : "hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950"
            }`}
            style={{ transitionTimingFunction: softSpringEasing }}
            aria-label="Collapse sidebar"
          >
            <ChevronDown size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailSidebar({
  activeSection,
  isDark,
}: {
  activeSection: string;
  isDark: boolean;
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const content = getSidebarContent(activeSection, isDark);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  };

  const toggleCollapse = () => setIsCollapsed((s) => !s);

  return (
    <aside
      className={`flex flex-col gap-4 items-start p-4 rounded-r-2xl transition-all duration-500 h-screen ${
        isCollapsed ? "w-16 min-w-16 px-0! justify-center" : "w-80"
      } ${isDark ? "bg-black" : "bg-white"}`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      {!isCollapsed && <BrandBadge isDark={isDark} />}

      <SectionTitle
        title={content.title}
        onToggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
        isDark={isDark}
      />
      <SearchContainer isCollapsed={isCollapsed} isDark={isDark} />

      <div
        className={`flex flex-col w-full overflow-y-auto transition-all duration-500 ${
          isCollapsed ? "gap-2 items-center" : "gap-4 items-start"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        {content.sections.map((section, index) => (
          <MenuSection
            key={`${activeSection}-${index}`}
            section={section}
            expandedItems={expandedItems}
            onToggleExpanded={toggleExpanded}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />
        ))}
      </div>

      {!isCollapsed && (
        <div
          className={`w-full mt-auto pt-2 border-t ${
            isDark ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2 px-2 py-2">
            <AvatarCircle isDark={isDark} />
            <div
              className={`text-sm ${
                isDark ? "text-neutral-50" : "text-neutral-950"
              }`}
            >
              User
            </div>
            <button
              type="button"
              className={`ml-auto size-8 rounded-md flex items-center justify-center ${
                isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-200"
              }`}
              aria-label="More"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="4"
                  cy="8"
                  r="1"
                  fill={isDark ? "#FAFAFA" : "#0A0A0A"}
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1"
                  fill={isDark ? "#FAFAFA" : "#0A0A0A"}
                />
                <circle
                  cx="12"
                  cy="8"
                  r="1"
                  fill={isDark ? "#FAFAFA" : "#0A0A0A"}
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ------------------------------ Menu Elements ---------------------------- */

function MenuItem({
  item,
  isExpanded,
  onToggle,
  onItemClick,
  isCollapsed,
  isDark,
}: {
  item: MenuItemT;
  isExpanded?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
  isCollapsed?: boolean;
  isDark: boolean;
}) {
  const handleClick = () => {
    if (item.hasDropdown && onToggle) onToggle();
    else onItemClick?.();
  };

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`rounded-lg cursor-pointer transition-all duration-500 flex items-center relative ${
          item.isActive
            ? isDark
              ? "bg-neutral-800"
              : "bg-neutral-200"
            : isDark
            ? "hover:bg-neutral-800"
            : "hover:bg-neutral-200"
        } ${
          isCollapsed
            ? "w-10 min-w-10 h-10 justify-center p-4"
            : "w-full h-10 px-4 py-2"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center justify-center shrink-0">
          {item.icon}
        </div>

        <div
          className={`flex-1 relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div
            className={`text-sm leading-5 truncate ${
              isDark ? "text-neutral-50" : "text-neutral-950"
            }`}
          >
            {item.label}
          </div>
        </div>

        {item.hasDropdown && (
          <div
            className={`flex items-center justify-center shrink-0 transition-opacity duration-500 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"
            }`}
            style={{ transitionTimingFunction: softSpringEasing }}
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-500 ${
                isDark ? "text-neutral-50" : "text-neutral-950"
              }`}
              style={{
                transitionTimingFunction: softSpringEasing,
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SubMenuItem({
  item,
  onItemClick,
  isDark,
}: {
  item: MenuItemT;
  onItemClick?: () => void;
  isDark: boolean;
}) {
  return (
    <div className="w-full pl-9 pr-1 py-px">
      <div
        className={`h-10 w-full rounded-lg cursor-pointer transition-colors ${
          isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-200"
        } flex items-center px-3 py-1`}
        onClick={onItemClick}
      >
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm leading-4 truncate ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            {item.label}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSection({
  section,
  expandedItems,
  onToggleExpanded,
  isCollapsed,
  isDark,
}: {
  section: MenuSectionT;
  expandedItems: Set<string>;
  onToggleExpanded: (itemKey: string) => void;
  isCollapsed?: boolean;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
          isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div className="flex items-center h-10 px-4">
          <div
            className={`text-sm ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {section.title}
          </div>
        </div>
      </div>

      {section.items.map((item, index) => {
        const itemKey = `${section.title}-${index}`;
        const isExpanded = expandedItems.has(itemKey);
        return (
          <div key={itemKey} className="w-full flex flex-col">
            <MenuItem
              item={item}
              isExpanded={isExpanded}
              onToggle={() => onToggleExpanded(itemKey)}
              onItemClick={() => console.log(`Clicked ${item.label}`)}
              isCollapsed={isCollapsed}
              isDark={isDark}
            />
            {isExpanded && item.children && !isCollapsed && (
              <div className="flex flex-col gap-1 mb-2">
                {item.children.map((child, childIndex) => (
                  <SubMenuItem
                    key={`${itemKey}-${childIndex}`}
                    item={child}
                    onItemClick={() => console.log(`Clicked ${child.label}`)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- Layout -------------------------------- */

export function TwoLevelSidebar() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDark(darkModeEnabled);

    // Watch for changes to the dark class
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setIsDark(isDarkNow);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-row">
      <IconNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isDark={isDark}
      />
      <DetailSidebar activeSection={activeSection} isDark={isDark} />
    </div>
  );
}

export default TwoLevelSidebar;
