'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type loginValidation } from '@/lib/validations/auth.validation';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

type FormInputs = z.infer<typeof loginValidation>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormInputs) => {
      return signIn('credentials', {
        ...data,
        redirect: false,
      });
    },
    onSuccess: async (result) => {
      if (!result?.ok) {
        toast.error('Bad credentials! Email or password is incorrect');
        mutation.reset();
      }

      if (result?.ok) {
        toast.success('Login successful', {
          invert: true,
        });
        mutation.reset();
        router.replace('/dashboard');
      }
    },
    onError: async () => {
      toast.error('Terjadi kesalahan.');
      mutation.reset();
    },
  });

  const onLogin = (data: FormInputs) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto w-full max-w-md px-5 py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2">
      <div className="relative mb-5 flex w-full flex-row items-center justify-center md:mb-10 lg:mb-14">
        <Image
          height={80}
          width={80}
          alt="Robot Mutasi"
          src="/assets/logo.svg"
        />
      </div>
      <h4 className="text-xl font-semibold md:text-3xl lg:text-4xl">
        <p className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text leading-tight text-transparent">
          Log In to Manage.
        </p>
        <p> — Effortless Tracking Starts Here.</p>
      </h4>
      <form
        className="relative mt-5 md:mt-10 lg:mt-14"
        onSubmit={(...args) => void form.handleSubmit(onLogin)(...args)}
      >
        <div className="relative mt-4">
          <Label
            htmlFor="email"
            className="relative mb-2 block"
          >
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            className="rounded-sm py-4"
            {...form.register('email')}
          />
        </div>
        <div className="relative mb-5 mt-4">
          <Label
            htmlFor="password"
            className="relative mb-2 block"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="rounded-sm py-4"
            {...form.register('password')}
          />
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="block w-full"
          size="lg"
        >
          Login
        </Button>
        <div className="relative mt-8 w-full">
          <p className="text-center">
            Don&apos;t have an account?{' '}
            <Link
              className="font-semibold"
              href="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
