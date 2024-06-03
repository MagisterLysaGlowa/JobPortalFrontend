import userService from "../../api/services/UserService";

interface Props {
  courseId: number;
  editProfilePageElements: any;
}

const DeleteCourseButton = (props: Props) => {
  const { courseId, editProfilePageElements } = props;

  const deleteCourseWithIdClick = async () => {
    await userService.DeleteUserCourse(courseId);
    await editProfilePageElements("courses");
  };
  return (
    <button
      className="py-3 text-white bg-red-400 font-bold shadow-sm rounded-md w-full"
      onClick={deleteCourseWithIdClick}
    >
      Usuń informację o kursie
    </button>
  );
};

export default DeleteCourseButton;
