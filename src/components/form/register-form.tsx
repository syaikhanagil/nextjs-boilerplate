'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StrengthIndicator } from '@/components/ui/strength-indicator';
import {
  passwordCompositionEvaluation,
  passwordStrengthEvaluation,
} from '@/lib/password';
import { cn } from '@/lib/utils';
import { type registerValidation } from '@/lib/validations/auth.validation';
import { trpc } from '@/trpc/react';
import { CheckIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

type FormInputs = z.infer<typeof registerValidation>;

const passwordComposition: {
  title: string;
  composition: 'length' | 'lowercase' | 'uppercase' | 'number' | 'symbol';
}[] = [
  { title: 'At least 8 Character', composition: 'length' },
  { title: 'Lowercase', composition: 'lowercase' },
  { title: 'Uppercase', composition: 'uppercase' },
  { title: 'Numbers', composition: 'number' },
  { title: 'Symbols (!#$..)', composition: 'symbol' },
];

export default function RegisterForm() {
  const [strengthIndicatorVisible, setStrengthIndicatorVisible] =
    useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const mutation = trpc.auth.register.useMutation({
    onSuccess: async (result, { email, password }) => {
      if (!result.success) {
        toast.error(result.message, {
          invert: true,
        });
        mutation.reset();
      }

      if (result.success) {
        toast.success(result.message, {
          invert: true,
        });
        mutation.reset();
        const login = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/login-successful',
        });

        if (login?.ok) {
          router.replace('/login-successful');
          return;
        }
      }
    },
    onError: async () => {
      toast.error('Terjadi kesalahan.');
      mutation.reset();
    },
  });

  const onRegister = (data: FormInputs) => {
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
        <span>Sign Up to </span>
        <span className="leading-tight text-primary">Simplify </span>
        <span>Your Bank Statement Management!</span>
      </h4>
      <form
        className="relative mt-5 md:mt-10 lg:mt-14"
        onSubmit={(...args) => void form.handleSubmit(onRegister)(...args)}
      >
        <div className="relative">
          <Label
            htmlFor="name"
            className="relative mb-2 block"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Full Name"
            className="rounded-sm py-4"
            {...form.register('name')}
          />
        </div>
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
        <div className="relative mt-4">
          <Label
            htmlFor="phone"
            className="relative mb-2 block"
          >
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="Phone"
            className="rounded-sm py-4"
            {...form.register('phone')}
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
            onFocus={() => {
              setStrengthIndicatorVisible(true);
            }}
            {...form.register('password')}
            onBlur={() => {
              if (form.getValues('password').length > 0) return;
              setStrengthIndicatorVisible(false);
            }}
          />
          {strengthIndicatorVisible && (
            <>
              <StrengthIndicator
                className="mt-2"
                strength={passwordStrengthEvaluation(form.watch('password'))}
              />
              <div className="relative mt-5 flex flex-col">
                {passwordComposition.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex flex-row items-center gap-1',
                      passwordCompositionEvaluation(form.watch('password'))[
                        item.composition
                      ]
                        ? 'text-green-400'
                        : 'text-foreground/60',
                    )}
                  >
                    <div
                      className={cn(
                        'basis-5',
                        passwordCompositionEvaluation(form.watch('password'))[
                          item.composition
                        ]
                          ? 'text-green-400'
                          : 'text-foreground/60',
                      )}
                    >
                      <CheckIcon size={18} />
                    </div>
                    <span className="text-xs font-semibold">{item.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <Button
          disabled={mutation.isPending}
          type="submit"
          size="lg"
          className="block w-full"
        >
          Register
        </Button>
        <div className="relative mt-8 w-full">
          <p className="text-center">
            Already have an account?{' '}
            <Link
              className="font-semibold"
              href="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
