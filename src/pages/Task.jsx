import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const {token} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(
          "Error fetching tasks:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Delete Method
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure want to delete this task?");
    if(!confirmDelete) return;

    try{
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted task from UI
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!"); // Show success toast
      //alert("Task deleted successfully!");
    }catch(error){
      console.log("Error deleting task:", error);
      toast.error("Failed to delete task."); // Show error toast
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h1>
          <Link
            to="/tasks/add"
            className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
          >
            Add New
          </Link> 
        </div>

        {loading ? (
          <p className="text-gray-600">Loading tasks.....</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.....</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.due_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <Link
                        to={`/tasks/edit/${task.id}`}
                        className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
