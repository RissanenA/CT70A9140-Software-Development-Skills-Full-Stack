import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: "Doctors Appointment",
        day: "Feb 5th at 2:30pm",
        reminder: true,
      },
      {
        id: 2,
        text: "Whatever Here Blah",
        day: "Oct 8th at 4:20pm",
        reminder: false,
      },
      {
        id: 3,
        text: "Doctors Blahblah Important Business Meeting",
        day: "Jan 666th at 0:00pm",
        reminder: true,
      }
    ]
  );

  const deleteTask = (id) => {
    setTasks(tasks.filter(
      (task) => task.id !== id
    ));
  };

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    setTasks([...tasks, { id, ...task }])
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder: !task.reminder
        } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Tracking App"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Routes>
          <Route path="/" exact element={(
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
              ) : (
                "No tasks"
              )}
            </>
          )} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
