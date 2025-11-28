export const contractAddress = "0x9216dBE1FCfe8A122DA7D9F8C34139417b0Cc9a5";

// Export only the ABI array expected by viem/wagmi
export const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "enum TaskPriorityManager.Priority",
        "name": "_priority",
        "type": "uint8"
      }
    ],
    "name": "addTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_taskId",
        "type": "uint256"
      }
    ],
    "name": "completeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_taskId",
        "type": "uint256"
      }
    ],
    "name": "getTask",
    "outputs": [
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "enum TaskPriorityManager.Priority",
        "name": "priority",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalTasks",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tasks",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "enum TaskPriorityManager.Priority",
        "name": "priority",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;