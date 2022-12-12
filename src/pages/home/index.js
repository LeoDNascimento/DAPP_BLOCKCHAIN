import React, { useEffect, useState } from "react";
// Informação do contrato
import registry from "../../contracts/registry.contract";
// Configuração para requisições na rede
import web3 from "../../utils/web3";
import "./styles.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";

function Home() {
  const [candidateNames, setCandidateNames] = useState([]);
  const [validCandidate, setValidCandidate] = useState("");
  const [vote, setVote] = useState("");
  const [loadingInsert, setLoadingInsert] = useState(false);
  
  const getCandidates = async () => {
    try {
      const response = await registry.methods.getAllCandidates().call();
      console.log(response);
      setCandidateNames(response);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewVotes = async (e) => {
    e.preventDefault();
    try {
      const contas = await web3.eth.getAccounts();
      const response = await registry.methods
        .totalVotesFor(vote)
        .send({ from: contas[0] });

      console.log(response);

    } catch (error) {
      alert("Ops, erro no cadastro de pessoa");
      console.log(error);
    }
  };

  const handleValidCandidate = async(e) => {
    e.preventDefault();
    try {
      console.log(candidateNames)
      const contas = await web3.eth.getAccounts();
      const response = await registry.methods
        .voteForCandidate(validCandidate)
        .send({ from: contas[0] });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // Cadastra nova pessoa
  const handleRegisterCandidate = async (e) => {
    e.preventDefault();
    try {

      console.log(candidateNames)
      const contas = await web3.eth.getAccounts();
      const response = await registry.methods
        .registerCandidates([candidateNames])
        .send({ from: contas[0] });

      console.log(response);

    } catch (error) {
      alert("Ops, erro no cadastro de pessoa");
      console.log(error);
    }
  };

  const add = async(e) =>{
    e.preventDefault();
    try {
      setCandidateNames([...candidateNames, candidateNames])

    } catch (error) {
      alert("Ops, erro no cadastro de pessoa");
      console.log(error);
    }
    
    
  }
  // useEffect(() => {
  //   getCandidates();
  //   console.log(candidateNames)
  // }, []);
  return (
    <div>
      <h2>Listagem de Candidatos</h2>
      
      <Divider />

      <form onSubmit={handleRegisterCandidate}>
        <div className="content">
          <h2>Cadastro de Candidatos</h2>
          <TextField id="outlined-basic" label="Candidate" variant="outlined" value={candidateNames} onChange={(e)=> add(e.target.value)} />
          <br />
          <br />
          <Button variant="contained" type="submit">Cadastrar</Button>
        </div>
      </form>
      

      <Divider />

      <form onSubmit={handleValidCandidate}>
        <div className="content">
          <h2>Candidato Válido</h2>
          <TextField id="outlined-basic" label="Candidate" variant="outlined" value={validCandidate} onChange={(e)=>setValidCandidate(e.target.value)} />
          <br />
          <br />
          <Button variant="contained" type="submit">Votar</Button>
        </div>
      </form>

      <br />
      <br />
      <Divider />

      <form onSubmit={handleViewVotes}>
        <div className="content">
          <h2>Total de Votos para</h2>
          <TextField id="outlined-basic" label="Candidate" variant="outlined" value={vote} onChange={(e)=>setVote(e.target.value)} />
          <br />
          <br />
          <Button variant="contained" type="submit">Olhar</Button>
        </div>
      </form>
    </div>
    
  );
}

export default Home;