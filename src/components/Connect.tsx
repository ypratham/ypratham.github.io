"use client";
import { ArrowRightIcon, Code2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

const ArrowRight = () => <ArrowRightIcon size={20} />;

type TForm = z.infer<typeof formSchema>;

const Connect = () => {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (formData: TForm) => {
    fetch("/api/send", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className="lg:container w-full flex flex-col gap-12 ">
      <div className="flex items-center  gap-2">
        <Code2Icon size={28} />
        <h2 className="text-3xl font-semibold tracking-wider">Connect</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 justify-between items-start">
        <p className=" leading-tight text-4xl font-bold">
          Let&apos;s work <br /> together 🤝
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex md:w-1/2 w-full flex-col gap-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <Input {...field} />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <Textarea {...field} />
                  </FormItem>
                );
              }}
            />
            <Button
              variant={"expandIcon"}
              Icon={ArrowRight}
              iconPlacement="right"
            >
              Connect
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p>©2024 ypratham · Version 1.0</p>
        <p>
          Made by <span className="text-blue-600">Pratham Yadav</span>
        </p>
        <p className="text-red-400">Life is Love</p>
      </div>
    </section>
  );
};

export default Connect;
