"use client";

import React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Added missing import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
];

interface ProfileFormProps {
  formData: any;
  isLoading: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const ProfileForm = ({
  formData,
  isLoading,
  onInputChange,
  onSelectChange,
  onSubmit,
  onCancel,
}: ProfileFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 animate-in fade-in zoom-in-95 duration-300"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            className="rounded-xl"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            className="rounded-xl"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (Read-only)</Label>
          <Input
            id="email"
            value={formData.email}
            disabled
            className="bg-muted rounded-xl cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className="rounded-xl"
            placeholder="+1 234 567 890"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(v) => onSelectChange("gender", v)}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal rounded-xl h-10",
                  !formData.dob && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dob ? (
                  format(new Date(formData.dob), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dob ? new Date(formData.dob) : undefined}
                onSelect={(date) =>
                  onSelectChange("dob", date?.toISOString() || "")
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Country Selector */}
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between rounded-xl h-10 font-normal"
              >
                {formData.country
                  ? countries.find((c) => c.label === formData.country)?.label
                  : "Select country..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={() =>
                          onSelectChange("country", country.label)
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.country === country.label
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {country.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={onInputChange}
          placeholder="Tell us a little bit about yourself..."
          rows={4}
          className="rounded-xl resize-none"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-xl"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-xl px-8 bg-blue-600 hover:bg-blue-500 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};
