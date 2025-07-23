"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return { error: "Unauthorized" };
    }

    const course = await getCourseById(courseId);

    if (!course) {
        return { error: "Course not found" };
    }

    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is empty");
    // }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            imageSrc: user.imageUrl || "/mascot.svg"
        });

        revalidatePath("/course");
        revalidatePath("/learn");
        return { redirect: "/learn" };
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        imageSrc: user.imageUrl || "/mascot.svg"
    });

    revalidatePath("/course");
    revalidatePath("/learn");
    return { redirect: "/learn" };
};