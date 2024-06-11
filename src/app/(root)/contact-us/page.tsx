"use client";

import GradientWrapper from "@/components/GradientWrapper";
import Title from "@/components/Title";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  contactUsValidator,
  contactUsValidatorType,
} from "@/validators/contactUsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "@/actions/contact-us";
import toast from "react-hot-toast";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<contactUsValidatorType>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
    },
    resolver: zodResolver(contactUsValidator),
  });

  const { mutate: handleContactUs, isPending } = useMutation({
    mutationKey: ["contact-us"],
    mutationFn: (values: contactUsValidatorType) => contactUs(values),
    onSuccess: (data) => {
      reset();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <section className="flex flex-col lg:h-[85vh] py-10">
      <GradientWrapper>
        <Title title="Contact Us" text="We'd love to hear from you" />
        <form
          className="flex flex-col justify-center items-center gap-y-6 mt-8 w-full"
          onSubmit={handleSubmit((data) => handleContactUs(data))}
        >
          <div className="flex flex-col gap-y-3 w-[90%] md:w-[60%] lg:w-[45%]">
            <Label className="ml-1.5" htmlFor="name">
              Name
            </Label>
            <Input
              placeholder="Enter your name"
              id="name"
              required
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-rose-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-[90%] md:w-[60%] lg:w-[45%]">
            <Label className="ml-1.5" htmlFor="email">
              Email
            </Label>
            <Input
              placeholder="Enter your email"
              id="email"
              required
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-rose-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-[90%] md:w-[60%] lg:w-[45%]">
            <Label className="ml-1.5" htmlFor="subject">
              Subject
            </Label>
            <Input
              placeholder="Enter the subject"
              id="subject"
              required
              {...register("subject", { required: true })}
            />
            {errors.subject && (
              <p className="text-rose-500 text-sm">{errors.subject.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-[90%] md:w-[60%] lg:w-[45%]">
            <Label className="ml-1.5" htmlFor="message">
              Message
            </Label>
            <Textarea
              placeholder="Type your message"
              id="message"
              required
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p className="text-rose-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Submit"}
          </Button>
        </form>
      </GradientWrapper>
    </section>
  );
};

export default ContactUs;
