'use client'

import { MoreVertical, MessageSquare, Clock, FileText, Trash2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import {Badge} from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import {Button} from '../ui/button';
export const studentColumns = [
  {
    id: 'select',
    header: ({ table }: any) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    size: 40,
  },
  {
    id: 'student',
    header: 'Student',
    accessorKey: 'name',
    cell: ({ row }: any) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">
            {row.original.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
          <p className="text-xs text-muted-foreground">ID: #{row.original.id}</p>
        </div>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'course',
    header: 'Course',
    accessorKey: 'course',
    cell: ({ row }: any) => (
      <div>
        <p className="font-medium text-foreground truncate max-w-[200px]">
          {row.original.course}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.original.courseLectures} lectures • {row.original.courseDuration}
        </p>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'enrolledAt',
    header: 'Enrolled Date',
    accessorKey: 'enrolledAt',
    cell: ({ row }: any) => (
      <div>
        <p className="text-sm text-foreground">{row.original.enrolledAt}</p>
        <p className="text-xs text-muted-foreground">{row.original.enrolledTimeAgo}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'progress',
    header: 'Progress',
    accessorKey: 'progress',
    cell: ({ row }: any) => (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">{row.original.progress}%</span>
        </div>
        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${row.original.progress}%` }}
          />
        </div>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }: any) => {
      const statusConfig: any = {
        active: { label: 'Active', icon: '🟢', variant: 'default' },
        completed: { label: 'Completed', icon: '✅', variant: 'secondary' },
        expired: { label: 'Expired', icon: '🔴', variant: 'destructive' },
      }

      const config = statusConfig[row.original.status] || statusConfig.active

      return (
        <div>
          <Badge variant={config.variant as any}>
            {config.icon} {config.label}
          </Badge>
          {row.original.statusExtra && (
            <p className="text-xs text-muted-foreground mt-1">{row.original.statusExtra}</p>
          )}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FileText className="w-4 h-4 mr-2" />
            View Progress
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Clock className="w-4 h-4 mr-2" />
            Extend Access
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Revoke Access
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    size: 60,
  },
]
