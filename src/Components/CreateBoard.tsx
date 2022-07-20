import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  width: 300px;
  display: flex;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 16px;
  outline: none;
`;
interface IBoardForm {
  board?: string;
}
export default function CreateBoard() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ board }: IBoardForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [board + ""]: [] };
    });
    setValue("board", "");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("board", { required: true })}
          type="text"
          placeholder={`Add board`}
        />
      </Form>
    </>
  );
}
