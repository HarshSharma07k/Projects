"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/app/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({courses, activeCourseId}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) {
            return;
        }

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id)
            .then((response) => {
                if (response?.redirect) {
                    router.push(response.redirect);
                }
            })
            .catch((error) => {
                console.error("Unexpected error:", error);
                toast.error("Something went wrong.");
            });
        });

    }
    return (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                onclick={onClick}
                disabled={pending}
                active={course.id === activeCourseId}
                />
                ))}
        </div>
    );
};