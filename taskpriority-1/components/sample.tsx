// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useTaskContract } from "@/hooks/useContract"

const SampleIntegration = () => {
  const { isConnected } = useAccount()
  const [taskDescription, setTaskDescription] = useState("")
  const [priority, setPriority] = useState("0")
  const [taskId, setTaskId] = useState("")

  const { data, actions, state } = useTaskContract()

  const handleAddTask = async () => {
    await actions.addTask(taskDescription, Number(priority))
    setTaskDescription("")
    setPriority("0")
  }

  const handleComplete = async () => {
    await actions.completeTask(Number(taskId))
    setTaskId("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-3">Task Manager</h2>
          <p>Please connect your wallet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Priority Manager</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Task</h2>
        <input
          type="text"
          placeholder="Task description"
          className="w-full mb-2 p-2 border rounded"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <select
          className="w-full mb-4 p-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="0">Low Priority</option>
          <option value="1">Medium Priority</option>
          <option value="2">High Priority</option>
        </select>
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handleAddTask}
          disabled={!taskDescription || state.isLoading}
        >
          {state.isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Complete Task</h2>
        <input
          type="number"
          placeholder="Task ID"
          className="w-full mb-2 p-2 border rounded"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button
          className="w-full bg-red-600 text-white p-2 rounded"
          onClick={handleComplete}
          disabled={!taskId || state.isLoading}
        >
          {state.isLoading ? "Completing..." : "Complete Task"}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
        <div className="space-y-3">
          {data.tasks.map((task) => (
            <div key={task.id} className="p-4 border rounded bg-gray-50">
              <p><strong>ID:</strong> {task.id}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.completed ? "Completed" : "Pending"}</p>
            </div>
          ))}
        </div>
      </div>

      {state.hash && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <p className="font-mono break-all">{state.hash}</p>
          {state.isConfirming && <p>Waiting for confirmation...</p>}
          {state.isConfirmed && <p className="text-green-600">Confirmed!</p>}
        </div>
      )}

      {state.error && (
        <div className="mt-4 p-4 border rounded bg-red-100 text-red-700">
          Error: {state.error.message}
        </div>
      )}
    </div>
  )
}

export default SampleIntegration
