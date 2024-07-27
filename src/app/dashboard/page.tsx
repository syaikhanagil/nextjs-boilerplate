import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative w-full">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="col-span-2">
            <Card className="relative bg-primary pe-0 lg:pe-[240px]">
              <CardHeader>
                <CardTitle className="text-invert">Hello, Dude!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-invert/70">
                  Welcome back, your dashboard is ready!
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Get Started</Button>
              </CardFooter>
              <div className="absolute bottom-0 right-2 hidden lg:block">
                <Image
                  src="/assets/illustration-home.svg"
                  height={280}
                  width={280}
                  alt="home illustration"
                />
              </div>
            </Card>
          </div>

          <Card className="col-span-2 bg-primary/10 lg:col-span-1">
            <CardHeader>
              <div className="relative flex flex-row items-center gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl">Debet</CardTitle>
                </div>
                <div className="basis-10">
                  <div className="relative flex h-10 items-center justify-center rounded-full border border-red-500 bg-red-100">
                    <MoveLeftIcon
                      className="text-red-500"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl">Rp. 200,000,000,000</p>
            </CardContent>
            <CardFooter>
              <div className="relative h-1 w-full rounded-full bg-red-200" />
            </CardFooter>
          </Card>

          <Card className="col-span-2 bg-primary/10 lg:col-span-1">
            <CardHeader>
              <div className="relative flex flex-row items-center gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl">Credit</CardTitle>
                </div>
                <div className="basis-10">
                  <div className="relative flex h-10 items-center justify-center rounded-full border border-green-500 bg-green-100">
                    <MoveRightIcon
                      className="text-green-500"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl">Rp. 1,600,000,000,000</p>
            </CardContent>
            <CardFooter>
              <div className="relative h-1 w-full rounded-full bg-green-200" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
