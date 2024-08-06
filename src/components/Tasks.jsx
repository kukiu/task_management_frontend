import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MultipleSelect from "react-select";
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";

function TaskUpdateModal({
  show,
  handleClose,
  task,
  handleFetchTask,
  memberList,
}) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [status, setStatus] = useState(task.status);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // populate member list
    const list =
      task.members &&
      task.members.map((user) => ({
        value: user.id,
        label: user.username,
      }));

    setSelectedOption(list);
  }, [show, handleClose]);

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `https://tws.techmedia.one/api/task_update/${task.id}/`,
          {
            title,
            description: desc,
            due_date: dueDate,
            status,
            member_ids: selectedOption && selectedOption.map((i) => i.value),
          },
          {
            headers: { Authorization: `Bearer ${user.access}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            handleFetchTask();
          }
        });
    } catch (e) {
      console.error("Failed to update task :", e);
      setError("Failed to update task");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>

        <Form
          onSubmit={handleTaskUpdate}
          className="d-flex align-items-center flex-column"
        >
          <Modal.Body>
            <Form.Group as={Row}>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  defaultValue={task.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <Form.Control
                  placeholder="Description"
                  defaultValue={task.description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todo">Todo</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Done">Done</option>
            </Form.Select>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <MultipleSelect
                  isMulti
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={memberList}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={task.due_date}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>

        {/* <form onSubmit={handleTaskUpdate}>
          <Modal.Body>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              name="description"
              defaultValue={task.description}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <br />
            <input
              type="date"
              name="dueDate"
              defaultValue={task.due_date}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todo">Todo</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Done">Done</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form> */}
      </Modal>
    </>
  );
}

const Tasks = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [taskList, setTaskList] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [task, setTask] = useState({});
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://tws.techmedia.one/api/task_create/",
          {
            title: title || task.title,
            description: desc || task.description,
            due_date: dueDate || task.due_date,
            member_ids: selectedOption && selectedOption.map((i) => i.value),
          },
          {
            headers: {
              Authorization: `Bearer ${user.access}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            handleFetchTask();
          }
        });
    } catch (e) {
      console.error("Failed to create task :", e);
      setError("Failed to create task");
    }
  };

  const handleFetchTask = async () => {
    try {
      await axios
        .get("https://tws.techmedia.one/api/task_all/", {
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setTaskList(response.data.data);
          }
        });
    } catch (e) {
      console.error("Failed to fetch task :", e);
      setError("Failed to fetch task");
    }
  };

  const handleAllMembers = async () => {
    try {
      await axios
        .get("https://tws.techmedia.one/api/member_all/", {
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            const list = response.data.data.map((user) => ({
              value: user.id,
              label: user.username,
            }));

            setMemberList(list);
          }
        });
    } catch (e) {
      console.error("Failed to fetch task :", e);
      setError("Failed to fetch task");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios
        .delete(`https://tws.techmedia.one/api/task_delete/${taskId}`, {
          headers: { Authorization: `Bearer ${user.access}` },
        })
        .then((response) => {
          if (response.data.success) {
            handleFetchTask();
          }
        });
    } catch (e) {
      console.error("Failed to delete task :", e);
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    handleFetchTask();
    handleAllMembers();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={handleCreateTask}
            className="d-flex align-items-center flex-column"
          >
            <Form.Group as={Row}>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <Form.Control
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <MultipleSelect
                  isMulti
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={memberList}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-3">
              <Col sm={12}>
                <input
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskList &&
                taskList.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.due_date}</td>
                      <td>{task.status}</td>
                      <td>
                        <ul>
                          {task.members.length > 0
                            ? task.members.map((i) => (
                                <li key={i.id}>{i.username}</li>
                              ))
                            : "No members"}
                        </ul>
                      </td>
                      <td>
                        <RiEditBoxFill
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          onClick={() => {
                            setTask(task);
                            handleShow();
                          }}
                        />

                        <RiDeleteBin2Fill
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          onClick={() => handleTaskDelete(task.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <TaskUpdateModal
            show={show}
            handleClose={handleClose}
            task={task}
            handleFetchTask={handleFetchTask}
            memberList={memberList}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
