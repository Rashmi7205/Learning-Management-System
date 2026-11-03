"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, Save, Globe, User2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const ProfileForm = ({
  formData,
  isLoading,
  onInputChange,
  onSelectChange,
  onSubmit,
  onCancel,
}: any) => {
  // Client-side validation check to match backend "isBlank" logic
  const isFormIncomplete =
    !formData.firstName ||
    !formData.lastName ||
    !formData.phone ||
    !formData.bio ||
    !formData.gender ||
    !formData.dob ||
    !formData.country ||
    !isValidPhoneNumber(formData.phone || "");

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FIRST NAME */}
        <div className="space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            First Name *
          </Label>
          <Input
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={onInputChange}
            className="bg-white/5 border-white/10 rounded-xl focus:ring-[#2845D6] text-white h-12"
          />
        </div>

        {/* LAST NAME */}
        <div className="space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Last Name *
          </Label>
          <Input
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={onInputChange}
            className="bg-white/5 border-white/10 rounded-xl focus:ring-[#2845D6] text-white h-12"
          />
        </div>

        {/* GENDER SELECTION */}
        <div className="space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Gender *
          </Label>
          <Select
            value={formData.gender}
            onValueChange={(v) => onSelectChange("gender", v)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-white">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-white/10 text-white">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* COUNTRY SELECTION */}
        <div className="space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Country *
          </Label>
          <Select
            value={formData.country}
            onValueChange={(v) => onSelectChange("country", v)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <SelectValue placeholder="Select Country" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-white/10 text-white">
              {/* Note: You can map a country list array here */}
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="IND">India</SelectItem>
              <SelectItem value="CAN">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PHONE WITH VALIDATION */}
        <div className="space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Phone Number *
          </Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone}
              onChange={(v) => onSelectChange("phone", v)}
              className={cn(
                "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-within:ring-2 focus-within:ring-[#2845D6] transition-all",
                formData.phone &&
                  !isValidPhoneNumber(formData.phone) &&
                  "border-red-500/50",
              )}
            />
          </div>
        </div>

        {/* DOB WITH YEAR DROPDOWN */}
        <div className="space-y-2 flex flex-col">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Date of Birth *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-12 justify-start text-left font-normal bg-white/5 border-white/10 rounded-xl hover:bg-white/10 text-white",
                  !formData.dob && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#2845D6]" />
                {formData.dob ? (
                  format(new Date(formData.dob), "PPP")
                ) : (
                  <span>Select Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#0F172A] border-white/10"
              align="start"
            >
              <Calendar
                mode="single"
                selected={formData.dob ? new Date(formData.dob) : undefined}
                onSelect={(date) => onSelectChange("dob", date?.toISOString())}
                captionLayout="dropdown"
                fromYear={1940}
                toYear={new Date().getFullYear()}
                className="bg-[#0F172A] text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* BIO */}
        <div className="md:col-span-2 space-y-2">
          <Label className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">
            Bio / Description *
          </Label>
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={onInputChange}
            rows={4}
            className="bg-white/5 border-white/10 rounded-2xl focus:ring-[#2845D6] text-white p-4 resize-none"
            placeholder="Introduce yourself to the community..."
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="submit"
          disabled={isLoading || isFormIncomplete}
          className="flex-1 bg-[#2845D6] hover:bg-[#1e36af] text-white rounded-xl h-12 font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          Sync Profile
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="px-8 h-12 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
