"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, Clock, MapPin, Users, User } from "lucide-react";
import { format } from "date-fns";
import { CategorySelect } from './category-select'; // Ensure correct import

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "./tag-input";
import { ImageUpload } from "./image-upload";

// Form validation schema with zod
const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  subCategory: z.string().min(1, "Please select a sub-category"),
  name: z
    .string()
    .min(2, "Event name must be at least 2 characters")
    .max(100, "Event name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  isVirtual: z.boolean(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  capacity: z
    .number()
    .int()
    .min(1, "Capacity must be at least 1")
    .max(1000000, "Capacity must be less than 1,000,000"),
  speaker: z.string().optional(),
  tags: z
    .array(z.string())
    .min(1, "Please add at least one tag")
    .max(10, "You can add up to 10 tags"),
  image: z.string().optional(),
  isPaid: z.boolean(),
  price: z.number().min(0, "Price cannot be negative").optional(),
  currency: z.enum(["USD", "EUR", "GBP"]),
  registrationDeadline: z.date().optional(),
  ageRestriction: z.enum(["All Ages", "18+", "21+"]),
  accessibility: z.array(z.string()),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subCategory: "",
      name: "",
      description: "",
      location: "",
      isVirtual: false,
      startDate: new Date(),
      endDate: new Date(),
      startTime: "",
      endTime: "",
      capacity: 0,
      speaker: "",
      tags: [],
      image: "",
      isPaid: false,
      price: 0,
      currency: "USD",
      ageRestriction: "All Ages",
      accessibility: [],
      termsAccepted: false,
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startDateTime: new Date(
            `${values.startDate.toISOString().split("T")[0]}T${
              values.startTime
            }`
          ),
          endDateTime: new Date(
            `${values.endDate.toISOString().split("T")[0]}T${values.endTime}`
          ),
        }),
      });

      if (response.ok) {
        toast({
          title: "Event created successfully!",
          description: "You will be redirected to the events page.",
        });
        router.push("/events");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create event.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while creating the event.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CategorySelect control={form.control} />

          {/* Event Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 opacity-70" />
                    <Input placeholder="Event location" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Virtual Event */}
          <FormField
            control={form.control}
            name="isVirtual"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Virtual Event</FormLabel>
                  <FormDescription>Is this a virtual event?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Date and Time */}
          <div className="flex space-x-4">
            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Event start time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* End Date and Time */}
          <div className="flex space-x-4">
            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Time */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Event end time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Capacity */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter event capacity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Speaker */}
          <FormField
            control={form.control}
            name="speaker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speaker</FormLabel>
                <FormControl>
                  <Input placeholder="Enter speaker name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Details */}
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Paid Event</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Price */}
            {form.watch("isPaid") && (
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Event price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Registration Deadline */}
          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-[240px] pl-3 text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a deadline</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age Restriction */}
          <FormField
            control={form.control}
            name="ageRestriction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Restriction</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="space-x-4">
                      <FormLabel className="flex items-center space-x-2">
                        <RadioGroupItem value="All Ages" />
                        <span>All Ages</span>
                      </FormLabel>
                      <FormLabel className="flex items-center space-x-2">
                        <RadioGroupItem value="18+" />
                        <span>18+</span>
                      </FormLabel>
                      <FormLabel className="flex items-center space-x-2">
                        <RadioGroupItem value="21+" />
                        <span>21+</span>
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Accessibility */}
          <FormField
            control={form.control}
            name="accessibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accessibility Options</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    <Checkbox
                      checked={field.value.includes("wheelchair")}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...field.value, "wheelchair"]
                            : field.value.filter((val) => val !== "wheelchair")
                        )
                      }
                    >
                      Wheelchair Accessible
                    </Checkbox>
                    <Checkbox
                      checked={field.value.includes("signLanguage")}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...field.value, "signLanguage"]
                            : field.value.filter(
                                (val) => val !== "signLanguage"
                              )
                        )
                      }
                    >
                      Sign Language
                    </Checkbox>
                    <Checkbox
                      checked={field.value.includes("hearingAssistance")}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...field.value, "hearingAssistance"]
                            : field.value.filter(
                                (val) => val !== "hearingAssistance"
                              )
                        )
                      }
                    >
                      Hearing Assistance
                    </Checkbox>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span>
                    I accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>
                  </span>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !form.formState.isValid}
          >
            {loading ? "Submitting..." : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
