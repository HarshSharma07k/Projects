import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursePage = async () => {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();

  const [
    courses,
    userProgress
  ] = await Promise.all([
    coursesPromise,
    userProgressPromise
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">
          Language courses
        </h1>
        <List
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
        />
    </div>
  );
};

export default CoursePage;
