// hooks/useContract.ts
"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface TaskData {
  id: number
  description: string
  priority: number
  completed: boolean
}

export interface ContractData {
  totalTasks: number
  tasks: TaskData[]
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  addTask: (description: string, priority: number) => Promise<void>
  completeTask: (taskId: number) => Promise<void>
}

export const useTaskContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState<TaskData[]>([])

  const { data: totalTasks, refetch: refetchTotalTasks } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTotalTasks",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const loadTasks = async () => {
    if (!totalTasks) return
    const count = Number(totalTasks)

    const loaded: TaskData[] = []
    for (let i = 0; i < count; i++) {
      try {
        const task: any = await useReadContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "tasks",
          args: [BigInt(i)]
        }).refetch()

        if (task?.data) {
          const [id, description, priority, completed] = task.data as any
          loaded.push({
            id: Number(id),
            description,
            priority: Number(priority),
            completed
          })
        }
      } catch (err) {}
    }

    setTasks(loaded)
  }

  useEffect(() => {
    loadTasks()
  }, [totalTasks])

  useEffect(() => {
    if (isConfirmed) {
      refetchTotalTasks()
      loadTasks()
    }
  }, [isConfirmed, refetchTotalTasks])

  const addTask = async (description: string, priority: number) => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addTask",
        args: [description, priority],
      })
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const completeTask = async (taskId: number) => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "completeTask",
        args: [BigInt(taskId)],
      })
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    totalTasks: totalTasks ? Number(totalTasks as bigint) : 0,
    tasks,
  }

  const actions: ContractActions = {
    addTask,
    completeTask,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return { data, actions, state }
}
