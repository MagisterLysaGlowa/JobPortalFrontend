import userService from "../../api/services/UserService";

interface Props {
  educationId: number;
  editProfilePageElements: any;
}

const DeleteEducationButton = (props: Props) => {
  const { educationId, editProfilePageElements } = props;

  const deleteEducationWithIdClick = async () => {
    await userService.DeleteUserEducation(educationId);
    await editProfilePageElements("educations");
  };
  return (
    <button
      onClick={deleteEducationWithIdClick}
      className="py-3 text-white bg-red-400 font-bold shadow-sm rounded-md w-full"
    >
      Usuń informację o edukacji
    </button>
  );
};

export default DeleteEducationButton;
