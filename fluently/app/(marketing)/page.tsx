import { Button } from "@/components/ui/button";
import Link from "next/link"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
      <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/hero.svg" fill alt="Hero" priority/>
        </div>
        <div className="flex flex-col gap-y-8">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            Learn, Practice and Master New Languages With Fluetly.
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/learn">
                    Continue Learning
                  </Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <SignUpButton
                mode="modal"
                fallbackRedirectUrl="/learn"
                >
                  <Button size="lg" className="w-full" variant="secondary">Get Started</Button>
                </SignUpButton>
                <SignInButton
                mode="modal"
                fallbackRedirectUrl="/learn"
                >
                  <Button size="lg" className="w-full" variant="primaryOutline">I already have an account</Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    );
}
