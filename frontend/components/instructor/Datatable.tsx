'use client'

import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface DataTableProps<TData> {
  columns: any[]
  data: TData[]
  searchPlaceholder?: string
  searchKey?: string
  pageSize?: number
  pageSizeOptions?: number[]
}import { ChevronDown, Lock, Play, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Lecture {
  title: string;
  type: "video" | "quiz" | "article" | "resource";
  duration?: string;
  isPreview?: boolean;
  isLocked?: boolean;
}

interface Section {
  title: string;
  duration: string;
  lectures: Lecture[];
}

interface CourseCurriculumProps {
  curriculum: Section[];
  totalSections: number;
  totalLectures: number;
  totalDuration: string;
}

const CourseCurriculum = ({
  curriculum,
  totalSections,
  totalLectures,
  totalDuration,
}: CourseCurriculumProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([0]),
  );

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "quiz":
        return <CheckCircle className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "resource":
        return <FileText className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Course Curriculum
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Sections</p>
            <p className="text-lg font-semibold text-foreground">
              {totalSections}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lectures</p>
            <p className="text-lg font-semibold text-foreground">
              {totalLectures}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-lg font-semibold text-foreground">
              {totalDuration}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {curriculum.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedSections.has(sectionIndex)
                      ? "rotate-0"
                      : "-rotate-90"
                  }`}
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.lectures.length} lectures • {section.duration}
                  </p>
                </div>
              </div>
            </button>

            {expandedSections.has(sectionIndex) && (
              <div className="border-t border-border bg-muted/30">
                {section.lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lectureIndex}
                    className="flex items-center gap-3 p-4 border-t border-border/50 last:border-t-0 hover:bg-muted/50 transition-colors"
                  >
                    {lecture.isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      getIcon(lecture.type)
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          lecture.isLocked
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {lecture.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {lecture.isPreview && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          Preview
                        </span>
                      )}
                      {lecture.duration && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {lecture.duration}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;

export function DataTable<TData>({
  columns,
  data,
  searchPlaceholder = 'Search...',
  searchKey = 'name',
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm bg-input border-border"
        />
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span className="text-xs">
                              {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '⇅'}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} results
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-transparent border-border"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-transparent border-border"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <Button
                key={i}
                variant={table.getState().pagination.pageIndex === i ? 'default' : 'outline'}
                size="sm"
                onClick={() => table.setPageIndex(i)}
                className={
                  table.getState().pagination.pageIndex === i
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent border-border hover:bg-secondary'
                }
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-transparent border-border"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="bg-transparent border-border"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground"
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
