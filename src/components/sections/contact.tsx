
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { contactFormSchema } from '@/lib/schemas';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};


export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: 'Success!',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
    }
  }

  return (
    <motion.section 
        id="contact" 
        className="py-24 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
            Have a project in mind or just want to say hello? Drop me a line at <a href="mailto:venkatabhilash432004@gmail.com" className="text-primary underline">venkatabhilash432004@gmail.com</a> or use the form below.
          </p>
        </div>

        <div
          className="max-w-2xl mx-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell me about your project..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? <Loader className="mr-2 h-5 w-5 animate-spin" /> : 'Send Message'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.section>
  );
}
