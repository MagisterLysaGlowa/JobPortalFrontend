import userService from "../../api/services/UserService";

interface Props {
  experienceId: number;
  editProfilePageElements: any;
}

const DeleteExperienceButton = (props: Props) => {
  const { experienceId, editProfilePageElements } = props;

  const deleteExperienceWithIdClick = async () => {
    await userService.DeleteUserExperience(experienceId);
    await editProfilePageElements("experiences");
  };
  return (
    <button
      onClick={deleteExperienceWithIdClick}
      className="py-3 text-white bg-red-400 font-bold shadow-sm rounded-md w-full"
    >
      Usuń informację o doświadczeniu
    </button>
  );
};

export default DeleteExperienceButton;
