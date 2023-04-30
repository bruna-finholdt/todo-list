import { useEffect, useState } from "react";
import styled from "styled-components";
// import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage";

const StyledInput = styled.input`
  background-color: white;
  width: 300px;
  margin-bottom: 20px;
  margin-right: 5px;
  border-radius: 3px;
  height: 28px;
  &:focus {
    border: 3px solid #0277BD;
    outline: none;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
`;
const StyledSpan = styled.span`
  width: 450px;
  font-family: roboto;

  overflow: hidden;
`;
const StyledDivRender = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
// const StyledIconSpan = styled.span`
//   margin-left: 5px;
//   margin-top: 2px;
// `;
const StyledButton = styled.button`
  border-radius: 15%;
  background-color: #b0bec5;
  font-family: roboto;
  height: 32px;
  width: 35px;
`;
const StyledClearButton = styled.button`
  border-radius: 5px;
  background-color: #b0bec5;
  font-family: roboto;
  width: 130px;
  margin-bottom: 15px;
`;
const InputComponent = () => {
  // console.log('rendering')
  interface Task {
    id: string;
    name: string;
  }
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [inputedTask, setInputedTask] = useState("");
  const [open, setOpen] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>(
    new Array(tasks.length).fill(false)
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputedTask(event.target.value);
  };
  const handleClick = () => {
    if (inputedTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { name: inputedTask, id: uuidv4() },
      ]);
      setInputedTask("");
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  // const deleteTask = (id: string) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  // };
  const deleteAllTasks = () => {
    setTasks([]);
    setOpen(false);
    setCheckedTasks(new Array(tasks.length).fill(false));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <StyledDiv>
        <div>
          <StyledLabel htmlFor="task">Type a task you have to do:</StyledLabel>
          <div>
            <StyledInput
              value={inputedTask}
              id="task"
              type="text"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <StyledButton
              style={{ fontWeight: "bold" }}
              onClick={handleClick}
              type="submit"
            >
              OK
            </StyledButton>
          </div>
        </div>
        {tasks.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledClearButton
              style={{ height: "28px", fontWeight: "bold" }}
              onClick={() => handleClickOpen()}
            >
              CLEAR ALL TASKS
            </StyledClearButton>
          </div>
        )}
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <StyledDivRender>

                <Checkbox
                  checked={checkedTasks[index]}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newCheckedTasks = [...checkedTasks];
                    newCheckedTasks[index] = event.target.checked;
                    setCheckedTasks(newCheckedTasks);
                  }}
                  color="default"
                />


                <StyledSpan
                  style={{
                    textShadow: "10px 2px 4px rgba(0, 0, 0, 0.1)",
                    fontWeight: "bold",
                    textDecoration: checkedTasks[index]
                      ? "line-through"
                      : "none",
                    wordWrap: "break-word"
                  }}
                >
                  {task.name}
                </StyledSpan>
                {/* <StyledIconSpan>
                  <DeleteIcon
                    style={{
                      color: "#607D8B",
                      marginTop: "5px",
                      width: "35px",
                    }}
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  />
                </StyledIconSpan> */}
              </StyledDivRender>
            </li>
          ))}
        </ul>
      </StyledDiv>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to clear all tasks?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Be sure to only do that if you have successfully completed them!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteAllTasks} autoFocus>
            Clear all tasks
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputComponent;
