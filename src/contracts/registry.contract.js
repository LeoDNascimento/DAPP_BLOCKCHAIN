// importa o web3
import web3 from "../utils/web3";
// Endereço do contrato gerado no deploy
const address = "0xeA78aB4E885caFacF4ae36C17F76b5f242Bb4c3B";
// Abi gerada no deploy do contrato
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "cpf",
                "type": "uint64"
            }
        ],
        "name": "findByCpf",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint64",
                        "name": "cpf",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint32",
                        "name": "birthdate",
                        "type": "uint32"
                    }
                ],
                "internalType": "struct Person",
                "name": "_people",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xdce059e5"
    },
    {
        "inputs": [],
        "name": "getAllPeople",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint64",
                        "name": "cpf",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint32",
                        "name": "birthdate",
                        "type": "uint32"
                    }
                ],
                "internalType": "struct Person[]",
                "name": "_people",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x85a26d7d"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x8da5cb5b"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "people",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint64",
                "name": "cpf",
                "type": "uint64"
            },
            {
                "internalType": "uint32",
                "name": "birthdate",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x9e7a13ad"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint64",
                        "name": "cpf",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint32",
                        "name": "birthdate",
                        "type": "uint32"
                    }
                ],
                "internalType": "struct Person",
                "name": "person",
                "type": "tuple"
            }
        ],
        "name": "registry",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x7e90e377"
    }
]

//exporte o contrato
export default new web3.eth.Contract(abi, address);